export type IssueState = "open" | "closed";
export type IssueFilter = "all" | IssueState;

export interface IssueLabel {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface IssueUser {
  login: string;
  avatarUrl: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: IssueState;
  author: IssueUser;
  labels: IssueLabel[];
  commentsCount: number;   
  createdAt: string;
  updatedAt: string;
}


export interface IssueComment {
  id: number;
  body: string;
  user: IssueUser;
  createdAt: string;
}