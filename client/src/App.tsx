import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectList from './components/ProjectList';
import CommitsList from './components/CommitsList';
import { Project } from './types/Project';
import { Commit } from './types/Commit';
import SortSection from './components/SortSection';
import { sortTypeFunc, sortTypeStringFunc } from './helpers/sortFuncs';
import showErrorAlert from './helpers/alerts';

function App() {
  const [organization, setOrganization] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedProjectUrl, setSelectedProjectUrl] = useState<string>("");
  const [commits, setCommits] = useState<Commit[]>([]);
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
  
  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>(`https://api.github.com/orgs/${organization}/repos`);
      setProjects(response.data);
      changeSortOption("Updated At");
    } catch (error) {
      showErrorAlert(error.response.status, organization, "organization");
    }
  };

  const fetchCommits = async (index: number) => {
    try {
      const selected = projects[index];
      setSelectedProject(selected.name);
      setSelectedProjectUrl(selected.html_url);
      document.getElementById('commit_modal').showModal();
      setCommits([]);
      const response = await axios.get<Commit[]>(`https://api.github.com/repos/${organization}/${selectedProject}/commits`);
      setCommits(response.data);
    } catch (error) {
      if (selectedProject !== null) showErrorAlert(error.response.status,selectedProject, "commits");
      document.getElementById('commit_modal').close();
    }
  };

  useEffect(() => {
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
    
  }, [sortType])

  return (
    <div className='App text-slate-400 flex flex-col place-items-center text-center'>
      <h1 className='m-2 text-lime-100 font-bold'>Github Organization Viewer</h1>
      <div className='m-2'>
        <input
          id="input-org"
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Enter GitHub organization"
          className='m-2 p-2 bg-slate-400/10 rounded-lg'
        />
        <button onClick={fetchProjects} className='bg-black/20'>Fetch Projects</button>
      </div>
      

      {
        projects.length > 0 &&
        <SortSection sortType={sortType} selectedButton={selectedMetric} onClick={changeSortOption} />
      }

      { 
        projects.length > 0 &&
        <ProjectList projects={projects} onSelectProject={fetchCommits} />
      }

      {
        selectedProject && (
          <CommitsList commits={commits} project={selectedProject} projectUrl={selectedProjectUrl}/>
        )
      }
    </div>
  );
}

export default App;
