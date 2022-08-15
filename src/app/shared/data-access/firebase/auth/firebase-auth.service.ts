import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {forkJoin, from, Observable, switchMap, tap} from "rxjs";
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
        this.createUser(doc.valueChanges());
        return doc.valueChanges();
      })
    )
  }

  createUser(data: Observable<any>) {
    data.subscribe(user => {
      const groupsCreatedReqs = forkJoin(user.groups_created.map((ref: any) => {
        console.log(ref.id);
        this.firestore.doc(`groups/${ref.id}`).valueChanges()
      }));
      const groupsMemberReqs = forkJoin(user.groups_member.map((ref: any) => this.firestore.doc(`groups/${ref.id}`).valueChanges()));
      const listsCreatedReqs = forkJoin(user.lists_creator.map((ref: any) => this.firestore.doc(`lists/${ref.id}`).valueChanges()));
      const listsEditorReqs = forkJoin(user.lists_editor.map((ref: any) => this.firestore.doc(`lists/${ref.id}`).valueChanges()));
      groupsMemberReqs.subscribe(data => console.log(data));
      forkJoin([groupsCreatedReqs, groupsMemberReqs, listsCreatedReqs, listsEditorReqs]).subscribe(data => console.log(data));
    })
  }
}
