import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Repice } from 'src/app/interfaces/repice';


@Injectable({
  providedIn: 'root'
})
export class RepiceService {

  private repiceCollection: AngularFirestoreCollection<Repice>;
  private repiceDoc: AngularFirestoreDocument<Repice>;
  private repices: Observable<Repice[]>;
  private repice: Observable<Repice>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.repiceCollection = this.afs.collection('repices', ref => ref);
  }

  getRepice(idRepice: string) {
    this.repiceDoc = this.afs.doc<Repice>(`repices/${idRepice}`);
    this.repice = this.repiceDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Repice;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.repice;
  }

  getAllRepices(): Observable<Repice[]> {
    this.repices = this.repiceCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Repice;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return this.repices;
  }

  getAllRepicesForUser(userId: string): Observable<Repice[]> {
    this.repices = this.repiceCollection.snapshotChanges()
      .pipe(map(changes => {
        // let a = changes.filter((action) => action.payload.doc.u);
        return changes.map(action => {
          let data;
          if (action.payload.doc.data().userId === userId) {
            data = action.payload.doc.data() as Repice;
            data.id = action.payload.doc.id;
          } else {
            data = {};
          }
          return data;
        });
      }));
    return this.repices;
  }

  addRepice(repice: Repice) {
    this.repiceCollection.add(repice);
  }

  updateRepice(repice: Repice) {
    this.repiceDoc = this.afs.doc(`repices/${repice.id}`);
    this.repiceDoc.update(repice);
  }

  deleteRepice(repice: Repice) {
    this.repiceDoc = this.afs.doc(`repices/${repice.id}`);
    this.repiceDoc.delete();
  }
}
