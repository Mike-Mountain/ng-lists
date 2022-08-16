import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {forkJoin, from, Observable, switchMap, tap, zip} from "rxjs";
import {SessionService, User} from "../../session";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: AngularFireAuth,
              private sessionService: SessionService,
              private firestore: AngularFirestore) { }

  public signIn(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(response => {
        const doc = this.firestore.doc(`users/${response.user?.uid}`);
        return doc.valueChanges();
      }),
      tap((user) => {
        this.sessionService.login({user})
      })
    )
  }
}
