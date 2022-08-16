import { Injectable } from '@angular/core';
import { ListsStore } from './lists.store';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({ providedIn: 'root' })
export class ListsService {

  constructor(private listsStore: ListsStore,
              private firestore: AngularFirestore) {
  }

}
