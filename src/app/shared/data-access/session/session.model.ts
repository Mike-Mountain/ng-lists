export interface Session {
  user: User;
  // token: string;
}

export interface User {
  email: string;
  username: string;
  groupsCreated: string[];
  groupsMember: string[];
  listsCreator: string[];
  listsEditor: string[];
}
