import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionStore } from './session.store';
import { Session } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<Session> {
  constructor(override store: SessionStore) {
    super(store);
  }
}
