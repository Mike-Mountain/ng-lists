import {Injectable} from '@angular/core';
import {GroupsStore} from './groups.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {forkJoin, Observable, tap, zip} from "rxjs";
import {Group} from "./group.model";

@Injectable({providedIn: 'root'})
export class GroupsService {

  constructor(private groupsStore: GroupsStore,
              private firestore: AngularFirestore) {
  }

  public getMultipleGroupsByIds(groupIds: string[]) {
    return (zip(groupIds.map(id => this.firestore.doc(id).valueChanges())) as Observable<Group[]>).pipe(tap((groups) => this.groupsStore.upsertMany(groups)));
  }
}
