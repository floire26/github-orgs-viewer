import React from 'react';
import { Project } from '../types/Project';
import { formatDate } from '../helpers/dateFormatter';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (index: number, project: string) => void;
}


const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {  
  return (
    <div className='mx-4 flex flex-col place-items-center' id='project-list'>
      <h2 className='m-4 text-4xl font-semibold'>Projects</h2>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div onClick={() => onSelectProject(i, project.name)} className="card bg-transparent text-primary-content" data-testid={"project-card-" + (i + 1)}>
            <button className="card-body flex place-items-center bg-black/30">
              <h2 className="card-title text-slate-400">{project.name}</h2>
                  <div className='flex place-items-center h-1/3 rounded-lg ring-1 m-2 p-2 text-center text-lime-100 ring-slate-400 w-full'>
                    <p className='italic'>{project.description === null ? "No description" : project.description} </p>
                  </div>
                  <div className='flex flex-row place-items-center rounded-lg w-full ring-1 ring-slate-400'>
                    <div className='flex flex-col text-amber-400 ring-1 ring-amber-200 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./star.svg" height={50} width={50}/>
                      <div>{project.stargazers_count}</div>
                    </div>
                    <div className='flex flex-col text-violet-600 ring-1 ring-violet-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./fork.svg" height={50} width={50}/>
                      <div>{project.forks_count}</div>
                    </div>
                    <div className='flex flex-col text-red-600 ring-1 ring-red-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./alert.svg" height={50} width={50}/>
                      <div>{project.open_issues_count}</div>
                    </div>
                    <div className='flex flex-col text-blue-600 ring-1 ring-blue-400 place-items-center p-1 m-2 w-1/4 rounded-lg'>
                      <img src="./watch.svg" height={50} width={50}/>
                      <div>{project.watchers_count}</div>
                    </div>
                  </div>
                  <div className="justify-self-end ring-1 m-2 p-2 rounded-lg text-sky-300 ring-slate-400 w-full">
                    <div>Updated At: {formatDate(new Date(project.updated_at))}</div>
                    <div>Created At: {formatDate(new Date(project.created_at))}</div>
                  </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
