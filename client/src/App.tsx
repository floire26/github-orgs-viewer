import React, { useEffect, useState } from 'react';
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
  const [sortType, setSortType] = useState<string>("desc2");

  const changeSortOption = (value: string) => {
    if (projects.length === 0) return;

    if (value === selectedMetric) {
      setSortType(sortType === "asc" ? "desc1" : "asc");    
      return;
    } 

    setSelectedMetric(value);
    setSortType("desc2");
  }

  const sortTypeFunc = (a: any, b: any, sortType: string) => sortType === "asc" ? b - a : a - b;
  const sortTypeStringFunc = (a: string, b: string, sortType: string) => sortType === "asc" ? b.localeCompare(a) : a.localeCompare(b);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`https://api.github.com/orgs/${organization}/repos`);
      setProjects(response.data);
      changeSortOption("Updated At");
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const fetchCommits = async (project: string) => {
    try {
      const response = await axios.get<Commit[]>(`https://api.github.com/repos/${organization}/${project}/commits`);
      setCommits(response.data);
      setSelectedProject(project);
      document.getElementById('my_modal_2').showModal()
    } catch (error) {
      console.error("Error fetching commits: ", error);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
      let sortedProjects = [...projects];
      
      switch (selectedMetric) {
        case "Name":
          sortedProjects = projects.sort((a, b) => sortTypeStringFunc(a.name, b.name, sortType));
          break;
        case "Stars": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(a.stargazers_count, b.stargazers_count, sortType));
          break;
        case "Forks": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(a.forks_count, b.forks_count, sortType));
          break;
        case "Open Issues": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(a.open_issues_count, b.open_issues_count, sortType));
          break;
        case "Watchers": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(a.watchers_count, b.watchers_count, sortType));
          break;
        case "Updated At": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(new Date(a.updated_at).getTime(), new Date(b.updated_at).getTime(), sortType));
          break;
        case "Created At": 
          sortedProjects = projects.sort((a, b) => sortTypeFunc(new Date(a.created_at).getTime(), new Date(b.created_at).getTime(), sortType));
          break;
        default:
          break;
      }

      setProjects(sortedProjects);
    // } , 10000);
    
  }, [sortType])

  return (
    <div className='App text-slate-400 flex flex-col place-items-center text-center'>
      <h1 className='m-2 text-lime-100 font-bold'>GitHub Projects Viewer</h1>
      <div>
        <input
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Enter GitHub organization"
          className='m-2 p-2 bg-slate-400/10 rounded-lg'
        />
        <button onClick={fetchProjects} className='bg-black/20'>Fetch Projects</button>
      </div>
      
      <h2 className='m-2 text-xl font-semibold'>Sort By:</h2>

      <div className='flex place-items-center align-self-center'>
        {
          metrics.map(metric => <Button value={metric} onClick={changeSortOption} sortType={sortType} selectedButton={selectedMetric} />)
        }
      </div>

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
