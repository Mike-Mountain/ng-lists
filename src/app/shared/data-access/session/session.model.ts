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

export function createUser(user: User) {
  const createdUser: User = {
    email: user.email,
    username: user.username,
    lists_creator: user.lists_creator.map((list: any) => list.id),
    lists_editor: user.lists_editor.map((list: any) => list.id),
    groups_created: user.groups_created.map((group: any) => group.id),
    groups_member: user.groups_member.map((group: any) => group.id)
  }
  return createdUser;
}
