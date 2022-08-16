import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ListsStore, ListsState } from './lists.store';

@Injectable({ providedIn: 'root' })
export class ListsQuery extends QueryEntity<ListsState> {

  constructor(override store: ListsStore) {
    super(store);
  }

}
