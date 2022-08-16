import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GroupsStore, GroupsState } from './groups.store';

@Injectable({ providedIn: 'root' })
export class GroupsQuery extends QueryEntity<GroupsState> {

  constructor(override store: GroupsStore) {
    super(store);
  }

}
