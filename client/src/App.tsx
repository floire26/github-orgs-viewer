import React, { useState } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import CommitsList from './CommitsList';
import { Project } from './types/Project';
import { Commit } from './types/Commit';
import Button from './props/Button';

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
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string>("desc");

  const changeSortOption = (value: string) => {
    if (value == selectedMetric) {
      setSortType(sortType == "desc" ? "asc" : "desc");
    } else {
      setSelectedMetric(value);
    }
    switch (value) {
      case "Name":
        setProjects(projects.sort((a, b) => sortTypeStringFunc(a.name, b.name, sortType)));
        break;
      case "Stars": 
        setProjects(projects.sort((a, b) => sortTypeFunc(a.stargazers_count, b.stargazers_count, sortType)));
        break;
      case "Forks": 
        setProjects(projects.sort((a, b) => sortTypeFunc(a.forks_count, b.forks_count, sortType)));
        break;
      case "Open Issues": 
        setProjects(projects.sort((a, b) => sortTypeFunc(a.open_issues_count, b.open_issues_count, sortType)));
        break;
      case "Watchers": 
        setProjects(projects.sort((a, b) => sortTypeFunc(a.watchers_count, b.watchers_count, sortType)));
        break;
      case "Updated At": 
        setProjects(projects.sort((a, b) => sortTypeFunc(new Date(a.updated_at).getTime(), new Date(b.updated_at).getTime(), sortType)));
        break;
      case "Created At": 
        setProjects(projects.sort((a, b) => sortTypeFunc(new Date(a.created_at).getTime(), new Date(b.created_at).getTime(), sortType)));
        break;
      default:
        break;
    }
  }

  const sortTypeFunc = (a: any, b: any, sortType: string) => sortType === "asc" ? a - b : b - a;
  const sortTypeStringFunc = (a: string, b: string, sortType: string) => sortType === "asc" ? a.localeCompare(b) : b.localeCompare(a);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`https://api.github.com/orgs/${organization}/repos`);
      setSelectedMetric("Created At");
      setSortType("desc");
      setProjects(response.data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
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
        metrics.map(metric => <Button value={metric} onClick={changeSortOption} />)
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
