import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { List } from './list.model';

export interface ListsState extends EntityState<List> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'lists' })
export class ListsStore extends EntityStore<ListsState> {

  constructor() {
    super();
  }

}
