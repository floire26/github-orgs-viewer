export interface Commit {
    sha: string;
    commit: {
      message: string;
      author: {
        name: string;
      };
    };
    html_url: string;
}