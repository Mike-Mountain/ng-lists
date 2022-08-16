export interface Session {
  user: User;
  // token: string;
}

export interface User {
  email: string;
  username: string;
  groups_created: string[];
  groups_member: string[];
  lists_creator: string[];
  lists_editor: string[];
}
