import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Project, Task } from '../types/index';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useAuth } from './useAuth';
import { useSubscription } from './useSubscription';
import { useNavigate } from 'react-router-dom';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { checkProjectLimit, currentPlan } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        tasks (*)
      `)
      .order('created_at', { ascending: false }) as PostgrestSingleResponse<Project[]>;

    if (error) {
      console.error('Error fetching projects:', error);
    } else if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const createProject = async (name: string, description?: string) => {
    if (!user) return;

    // Check project limits before creating
    const { canCreate, limit } = await checkProjectLimit();
    
    if (!canCreate) {
      // If user has reached limit, redirect to subscription page
      if (currentPlan.id === 'free') {
        navigate('/subscription', { 
          state: { 
            message: `You've reached the limit of ${limit} projects on the free plan. Please upgrade to create more projects.` 
          }
        });
        return;
      } else {
        throw new Error(`You've reached the maximum limit of ${limit} projects for your current plan.`);
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        user_id: user.id
      })
      .select()
      .single() as PostgrestSingleResponse<Project>;

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    } else if (data) {
      setProjects([...projects, { ...data, tasks: [] }]);
      return data;
    }
  };

  const createTask = async (projectId: number, title: string, description?: string, dueDate?: Date) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        project_id: projectId,
        title,
        description,
        due_date: dueDate,
        status: 'todo'
      })
      .select()
      .single() as PostgrestSingleResponse<Task>;

    if (error) {
      console.error('Error creating task:', error);
      throw error;
    } else if (data) {
      setProjects(
        projects.map((project) =>
          project.id === projectId
            ? { ...project, tasks: [...(project.tasks || []), data] }
            : project
        )
      );
      return data;
    }
  };

  return { projects, loading, createProject, createTask };
};