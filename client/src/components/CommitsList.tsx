import React from 'react';
import { Commit } from '../types/Commit';
import ProgressBar from '../props/ProgressBar';
import { formatDate } from '../helpers/dateFormatter';

interface CommitsListProps {
  commits: Commit[];
  project: string;
  projectUrl: string;
}

const CommitsList: React.FC<CommitsListProps> = ({ commits, project, projectUrl }) => {
  return (
    <div>
        <dialog id="commit_modal" className="modal">
          <div className="modal-box max-w-full bg-gradient-to-bl from-slate-600 to-slate-900">
            <h2 className='m-2 text-xl font-bold'>Commits for <a href={projectUrl}>{project}</a></h2>
            {
              commits.length === 0 ? 
              <ProgressBar />
              : <ul className="m-2 timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {commits.map((commit, i) => (
                  <li>
                    <div className="timeline-middle flex flex-col place-items-center" data-testid={"commit-card-" + (i + 1)}>
                      <img 
                        src={commit.author !== null ? commit.author.avatar_url : "./user.svg"}
                        height={75}
                        width={75}
                        className='rounded-full'
                      />
                      <a href={
                          commit.author == null ?
                          "mailto:" + commit.commit.author.email :
                          commit.author.html_url
                        }>
                            {commit.commit.author.name}
                      </a>
                    </div>
                    <div className={"mb-10 md:text-end timeline-box flex flex-col " + (i % 2 === 0 ? "timeline-start" : "timeline-end")}>
                      <time className="font-mono italic">{formatDate(new Date(commit.commit.author.date))}</time>
                      <div className="text-lg font-black"></div>
                      <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                          {
                            commit.commit.message.length > 100 ?
                            commit.commit.message.slice(0,100) + "..." :
                            commit.commit.message
                          }
                        </a>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            }
            
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  );
}

export default CommitsList;
