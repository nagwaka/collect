import React, { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';
import TaskList from '../components/tasks/TaskList';
import { Project } from '../types/index';

const Dashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <ProjectList onSelectProject={handleProjectSelect} />
        </div>
        <div style={{ flex: 2 }}>
          {selectedProject && (
            <TaskList project={selectedProject} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;