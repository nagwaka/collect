import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';
import TaskList from '../components/tasks/TaskList';
import { Project } from '../types/index';

const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <aside className="w-1/3">
          <ProjectList onSelectProject={(project) => setSelectedProject(project)} />
        </aside>
        <main className="w-2/3">
          {selectedProject ? (
            <TaskList project={selectedProject} />
          ) : (
            <div className="text-center text-gray-500 mt-8">
              Select a project to view tasks
            </div>
          )}
        </main>
      </div>
      
      <Routes>
        <Route path="projects/:projectId" element={<TaskList project={selectedProject!} />} />
      </Routes>
    </div>
  );
};

export default Home;
