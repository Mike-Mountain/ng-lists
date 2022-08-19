import {Injectable} from '@angular/core';
import {GroupsStore} from './groups.store';

@Injectable({providedIn: 'root'})
export class GroupsService {

  constructor(private groupsStore: GroupsStore) {
  }
}
