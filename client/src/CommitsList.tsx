import React from 'react';
import { Commit } from './types/Commit';

interface CommitsListProps {
  commits: Commit[];
  project: string;
}

const CommitsList: React.FC<CommitsListProps> = ({ commits, project }) => {
  return (
    <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box max-w-full bg-gradient-to-bl from-slate-600 to-slate-900">
            <h2 className='m-2 text-xl font-bold'>Commits for <a href="">{project}</a></h2>
            <ul className="m-2 timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {commits.map((commit, i) => (
                <li>
                  <div className="timeline-middle flex flex-col place-items-center">
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
                    <time className="font-mono italic">{new Date(commit.commit.author.date).toDateString()}</time>
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
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  );
}

export default CommitsList;
