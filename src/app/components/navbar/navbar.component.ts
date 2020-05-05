import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public appName = 'Repices';
  public isLogged = false;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.getAuth()
      .subscribe(auth => {
        if (auth) {
          console.log('user logged');
          this.isLogged = true;
        } else {
          console.log('Not user logged');
          this.isLogged = false;
        }
      });
  }
  onSignOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }


}
