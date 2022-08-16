import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  public getReferenceData<T>(ids: string[]) {
    return ids.map(id => this.firestore.doc(id).valueChanges()) as Observable<T>[];
  }
}
