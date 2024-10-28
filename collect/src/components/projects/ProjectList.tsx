import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import { Project } from '../../types';
import { useSubscription } from '../../hooks/useSubscription';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const { projects, loading, createProject } = useProjects();
  const { user } = useAuth();
  const { currentPlan } = useSubscription();
  const [newProjectName, setNewProjectName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be logged in to create a project');
      return;
    }

    if (projects.length >= currentPlan.limits.maxProjects) {
      navigate('/subscription', {
        state: {
          source: 'project-limit',
          message: `You've reached the limit of ${currentPlan.limits.maxProjects} projects on the ${currentPlan.name} plan.`
        }
      });
      return;
    }

    if (newProjectName.trim()) {
      try {
        await createProject(newProjectName.trim());
        setNewProjectName('');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to create project. Please try again.');
        }
      }
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading projects...</div>;
  }

  const isAtLimit = projects.length >= currentPlan.limits.maxProjects;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {projects.length} / {currentPlan.limits.maxProjects} Projects
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150"
          >
            <span className="font-medium text-gray-800">{project.name}</span>
            <span className="ml-2 text-sm text-gray-500">
              ({project.tasks?.length || 0} tasks)
            </span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateProject} className="mt-6 space-y-3">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-150"
        />
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isAtLimit}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-150 
              ${isAtLimit 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
          >
            Create Project
          </button>
          
          {isAtLimit && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-amber-800">
                    Project Limit Reached
                  </h3>
                  <p className="text-sm text-amber-700">
                    You've reached the maximum number of projects for your {currentPlan.name} plan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/subscription')}
                className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-medium transition-colors duration-150"
              >
                Upgrade Plan
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectList;