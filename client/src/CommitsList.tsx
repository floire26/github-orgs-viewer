import React from 'react';
import { Commit } from './types/Commit';

interface CommitsListProps {
  commits: Commit[];
  project: string;
}

const CommitsList: React.FC<CommitsListProps> = ({ commits, project }) => {
  return (
    <div>
      <h2>Commits for {project}</h2>
      <ul>
        {commits.map((commit) => (
          
          <li key={commit.sha}>
            <img 
              src={commit.author !== null ? commit.author.avatar_url : ""}
              height={75}
              width={75}
            />
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
              {
                commit.commit.message.length > 100 ?
                commit.commit.message.slice(0,100) + "..." :
                commit.commit.message
              }
            </a> 
            by <a href={
              commit.author == null ?
              "mailto:" + commit.commit.author.email :
              commit.author.html_url
            }>{commit.commit.author.name}</a> on {new Date(commit.commit.author.date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommitsList;
