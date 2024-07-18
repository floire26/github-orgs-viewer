import React from 'react';
import { Project } from './types/Project';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <button onClick={() => onSelectProject(project.name)}>
              <strong>{project.name}</strong>
              <div>Stars: {project.stargazers_count}</div>
              <div>Forks: {project.forks_count}</div>
              <div>Open Issues: {project.open_issues_count}</div>
              <div>Watchers: {project.watchers_count}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
