import { Group } from '../group';

export interface Session {
  user: User;
  token: string;
}

export interface User {
  username: string;
  email: string;
  groups: Group[];
}
