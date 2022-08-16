import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  public getReferenceData(collection: string, ids: string[]) {
    return ids.map(id => this.firestore.doc(`${collection}/${id}`).valueChanges());
  }
}
