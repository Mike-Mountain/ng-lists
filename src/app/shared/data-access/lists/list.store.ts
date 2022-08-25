import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { List } from './list.model';

export interface ListState extends EntityState<List> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'lists' })
export class ListStore extends EntityStore<ListState> {

  constructor() {
    super();
  }

}
