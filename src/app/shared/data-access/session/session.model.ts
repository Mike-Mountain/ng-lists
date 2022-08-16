export interface Session {
  user: User;
  // token: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  groupsCreated: string[];
  groupsMember: string[];
  listsCreated: string[];
  listsEditor: string[];
}
