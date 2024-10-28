import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { Project, Task } from '../../types/index';

interface TaskListProps {
  project: Project;
}

const TaskList: React.FC<TaskListProps> = ({ project }) => {
  const { createTask } = useProjects();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      try {
        await createTask(project.id, newTaskTitle.trim());
        setNewTaskTitle('')
      setNewTaskTitle('');
      } catch (error){
        console.error('Failed to create task:', error);
      }
      
    }
  };

  return (
    <div>
      <h3>Tasks for {project.name}</h3>
      <ul>
        {project.tasks?.map((task: Task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskList;