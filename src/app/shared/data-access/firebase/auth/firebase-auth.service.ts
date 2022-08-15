import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from, tap} from "rxjs";
import {SessionService} from "../../session";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: AngularFireAuth,
              private sessionService: SessionService) { }

  public signIn(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(tap(session => {console.log(session)}))
  }
}
