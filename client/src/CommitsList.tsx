import React from 'react';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
    };
  };
  html_url: string;
}

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
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
              {commit.commit.message}
            </a> by {commit.commit.author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommitsList;
