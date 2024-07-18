import React from 'react';
import { Project } from './types/Project';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  return (
    <div className='mx-4 flex flex-col place-items-center'>
      <h2>Projects</h2>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div onClick={() => onSelectProject(project.name)} className="card bg-primary text-primary-content w-96">
            <button className="card-body flex place-items-center">
              <h2 className="card-title">{project.name}</h2>
                  <div>{project.description === null ? "No description" : project.description}</div>
                  <div className='flex flex-row place-items-center border-2 rounded-lg'>
                    <div className='flex flex-col text-amber-400 ring-2 ring-amber-200 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./star.svg" height={50} width={50}/>
                      <div>{project.stargazers_count}</div>
                    </div>
                    <div className='flex flex-col text-violet-600 ring-2 ring-violet-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./fork.svg" height={50} width={50}/>
                      <div>{project.forks_count}</div>
                    </div>
                    <div className='flex flex-col text-red-600 ring-2 ring-red-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./alert.svg" height={50} width={50}/>
                      <div>{project.open_issues_count}</div>
                    </div>
                    <div className='flex flex-col text-blue-600 ring-2 ring-blue-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./watch.svg" height={50} width={50}/>
                      <div>{project.watchers_count}</div>
                    </div>
                  </div>
                  <div className="justify-self-end">
                    <div>Updated At: {new Date(project.updated_at).toDateString()}</div>
                    <div>Created At: {new Date(project.created_at).toDateString()}</div>
                  </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
