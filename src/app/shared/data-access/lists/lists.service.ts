import {Injectable} from '@angular/core';
import {ListsStore} from './lists.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {forkJoin, Observable, tap, zip} from "rxjs";
import {List, ListItem} from "./list.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ListsService {

  constructor(private listsStore: ListsStore,
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

}
