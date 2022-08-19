import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ListStore, ListState } from './list.store';

@Injectable({ providedIn: 'root' })
export class ListQuery extends QueryEntity<ListState> {

  constructor(override store: ListStore) {
    super(store);
  }

}
