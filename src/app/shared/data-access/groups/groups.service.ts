import { Injectable } from '@angular/core';
import { GroupsStore } from './groups.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({ providedIn: 'root' })
export class GroupsService {

  constructor(private groupsStore: GroupsStore,
              private firestore: AngularFirestore) {
  }
}
