export interface Session {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  provider: string;
  updatedAt: Date;
  groupsCreated: string[];
  groupsMember: string[];
  listsCreated: string[];
  listsEditor: string[];
}
