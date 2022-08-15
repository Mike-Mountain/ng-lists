import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import {Session, User} from "./session.model";

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private sessionStore: SessionStore) {}

  login(session: Session) {
    this.sessionStore.update(session);
  }
}
