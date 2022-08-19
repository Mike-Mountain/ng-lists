import {Injectable} from '@angular/core';
import {ListsStore} from './lists.store';

@Injectable({providedIn: 'root'})
export class ListsService {

  constructor(private listsStore: ListsStore) {
  }

}
