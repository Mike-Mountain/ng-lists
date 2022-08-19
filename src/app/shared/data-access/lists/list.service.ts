import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { ListStore, ListState } from './list.store';

@Injectable({ providedIn: 'root' })
export class ListService extends NgEntityService<ListState> {

  constructor(override store: ListStore) {
    super(store);
  }

}
