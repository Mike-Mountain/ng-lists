import {Injectable} from '@angular/core';
import {ListsStore} from './lists.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {forkJoin, Observable, tap, zip} from "rxjs";
import {List} from "./list.model";

@Injectable({providedIn: 'root'})
export class ListsService {

  constructor(private listsStore: ListsStore,
              private firestore: AngularFirestore) {
  }

  getListById(listId: string) {
    return this.firestore.doc(listId).valueChanges();
  }

  getMultipleListsByIds(listIds: string[]): Observable<List[]> {
    return (zip(listIds.map(id => this.firestore.doc(id).valueChanges())) as Observable<List[]>).pipe(tap((lists) => this.listsStore.update(lists)))
  }

}
