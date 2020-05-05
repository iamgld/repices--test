import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  getAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
