import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Observable } from 'rxjs';

import { RepiceService } from './../../services/repice.service';
import { AuthService } from './../../services/auth.service';
import { Repice } from './../../interfaces/repice';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  idRepice: string;
  idUserLogin: string;

  repice: Repice = {
    title: '',
    description: '',
    ingredients: '',
    preparation: '',
    season: '',
    datePublication: 0,
    userId: '',
    userName: ''
  };

  constructor(
    private authService: AuthService,
    private repiceService: RepiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onCheckUserLogin();
    this.getDetailsRepice();
  }

  onCheckUserLogin(): void {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.idUserLogin = user.uid;
      }
    });
  }

  getDetailsRepice(): void {
    this.idRepice = this.route.snapshot.params.id;
    this.repiceService.getRepice(this.idRepice)
      .subscribe(repice => this.repice = repice);
  }

  onClickDelete(): void {
    if (confirm('¿are you sure?')) {
      this.repiceService.deleteRepice(this.repice);
      this.router.navigate(['/']);
    }
  }

}
