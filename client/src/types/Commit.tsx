export interface Commit {
    sha: string;
    author: {
        avatar_url: string;
        html_url: string;
    };
    commit: {
      message: string;
      author: {
        name: string;
        email: string;
        date: Date;
      };
    };
    html_url: string;
}