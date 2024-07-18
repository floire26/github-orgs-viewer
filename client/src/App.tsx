import React, { useState } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import CommitsList from './CommitsList';
import { Project } from './types/Project';
import { Commit } from './types/Commit';

function App() {
  const [organization, setOrganization] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [metrics, setMetrics] = useState<string[]>([
    "Name",
    "Stars",
    "Forks",
    "Open Issues",
    "Watchers",
    "Updated At",
    "Created At"
  ])

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`https://api.github.com/orgs/${organization}/repos`);
      setProjects(response.data.sort((a, b) => b.stargazers_count - a.stargazers_count));
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const fetchCommits = async (project: string) => {
    try {
      const response = await axios.get<Commit[]>(`https://api.github.com/repos/${organization}/${project}/commits`);
      setCommits(response.data);
      setSelectedProject(project);
    } catch (error) {
      console.error("Error fetching commits: ", error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Projects</h1>
      <input
        type="text"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        placeholder="Enter GitHub organization"
      />
      <button onClick={fetchProjects}>Fetch Projects</button>
      <h2>Sort By:</h2>
      {
        metrics.map(metric => <button>{metric}</button>)
      }
      {projects.length > 0 && (
        <ProjectList projects={projects} onSelectProject={fetchCommits} />
      )}
      {selectedProject && (
        <CommitsList commits={commits} project={selectedProject} />
      )}
    </div>
  );
}

export default App;
