import { Group } from '../groups';
import { List } from '../lists';

export interface Session {
  user: User;
  token: string;
}

export class User {
  id: string;
  email: string;
  username: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  provider: string;
  updatedAt: Date;
  groupsCreated: Group[];
  groupsMember: Group[];
  listsCreated: List[];
  listsEditor: List[];

  constructor(params: User) {
    (this.id = params.id),
      (this.email = params.email),
      (this.username = params.username),
      (this.blocked = params.blocked),
      (this.confirmed = params.confirmed),
      (this.createdAt = params.createdAt),
      (this.provider = params.provider),
      (this.updatedAt = params.updatedAt),
      (this.groupsCreated = params.groupsCreated || []),
      (this.groupsMember = params.groupsMember || []),
      (this.listsCreated = params.listsCreated || []),
      (this.listsEditor = params.listsEditor || []);
  }
}
