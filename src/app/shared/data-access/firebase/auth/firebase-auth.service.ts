import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from, Observable, switchMap, tap} from "rxjs";
import {SessionService, User} from "../../session";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private auth: AngularFireAuth,
              private sessionService: SessionService,
              private firestore: AngularFirestore) {
  }

  public signIn(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(response => {
        const doc = this.firestore.doc(`users/${response.user?.uid}`);
        return doc.valueChanges();
      }),
      tap((user) => {
        this.sessionService.login({user});
        localStorage.setItem('user', JSON.stringify(user));
      })
    )
  }

  public register(email: string, username: string, password: string) {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(switchMap((response) => {
        if (response.user) {
          const user: User = {
            id: response.user.uid,
            email,
            username,
            groupsCreated: [],
            groupsMember: [],
            listsCreated: [],
            listsEditor: []
          }
          return from(this.firestore.collection('users').doc(response.user?.uid).set(user))
        } else {
          throw new Error('User could not be created!')
        }
      }),
    )
  }
}
