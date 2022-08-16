import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  public getReferenceData(collection: string, ids: string[]) {
    return ids.map(id => this.firestore.doc(`${collection}/${id}`).valueChanges());
  }

  public getUsername(userId: string): Observable<string> {
    return this.firestore.doc(`users/${userId}`).valueChanges() as Observable<string>;
  }
}
