import {Injectable} from '@angular/core';
import {ListsStore} from './lists.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, Observable, of, switchMap, tap, zip} from "rxjs";
import {List, ListItem} from "./list.model";
import {map} from "rxjs/operators";
import {SessionQuery, User} from "../session";

@Injectable({providedIn: 'root'})
export class ListsService {

  constructor(private listsStore: ListsStore,
              private sessionQuery: SessionQuery,
              private firestore: AngularFirestore) {
  }

  getListById(listId: string) {
    return this.firestore.doc(listId).valueChanges();
  }

  getMultipleListsByIds(listIds: string[]): Observable<List[]> {
    return (zip(listIds.map(id => this.firestore.doc(id).valueChanges())) as Observable<List[]>).pipe(
      map((lists: any) => {
        lists.forEach((list: any) => {
          list.items = list.items.map((item: string) => {
            const listItem: ListItem = {
              name: item,
              isComplete: false
            }
            return listItem
          })
        })
        return lists;
      }),
      tap((lists) => this.listsStore.upsertMany(lists))
    )
  }

  deleteList(list: List) {
    const userDoc = this.firestore.doc(`users/${list.createdBy.userId}`);
    const user = JSON.parse(JSON.stringify(this.sessionQuery.getValue().user));
    user.listsCreated = user.listsCreated.filter((listId: string) => listId !== list.id);
    return from(userDoc.update(user)).pipe(
      switchMap(() => {
        // Fetch all users that are editors on the list
        if (list.editors.length > 0) {
          const editors = list.editors.map(editor => this.firestore.doc(editor).valueChanges());
          return zip(editors);
        } else {
          return of([])
        }
      }),
      // switchMap((editors: any[]) => {
      //   if (editors.length === 0) {
      //     // If the list has no editors, move on
      //     return of(editors);
      //   }
      //   // Remove list reference from editors
      //   const requests: Observable<any>[] = [];
      //   editors.forEach((editor: User) => {
      //     let listIds = editor.listsEditor.map(listEditor => listEditor.substring(6));
      //     listIds = listIds.filter(id => id !== list.id).map(id => `lists/${id}`);
      //     editor.listsCreated = listIds;
      //     requests.push(from(this.firestore.doc(`users/${editor.id}`).update(editor)))
      //   });
      //   return zip(requests);
      // }),
      // switchMap(() => {
      //   // Fetch the group that the list belongs to
      //   return this.firestore.doc(list.group).valueChanges()
      // }),
      // switchMap((group: any) => {
      //   if (!group) {
      //     // If the group does not exist (ie: a personal list), move on)
      //     return of({});
      //   }
      //   // Update the group
      //   let groupIds = group.lists.map((groupList: string) => groupList.substring(8));
      //   groupIds = groupIds.filter((id: string) => id !== list.id).map((id: string) => `lists/${id}`);
      //   group.lists = groupIds;
      //   return from(this.firestore.doc(`groups/${group.id}`).update(group))
      // }),
      // switchMap(() => {
      //   // Finally, delete the list
      //   return from(this.firestore.doc(`lists/${list.id}`).delete())
      // })
    )
  }

}
