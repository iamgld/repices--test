import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RepiceService } from './../../services/repice.service';
import { Repice } from './../../interfaces/repice';

@Component({
  selector: 'app-addrepice',
  templateUrl: './addrepice.component.html',
  styleUrls: ['./addrepice.component.scss']
})
export class AddrepiceComponent implements OnInit {

  repice: Repice = {
    id: '',
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
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmitForAddRepice(repice: Repice) {
    // tslint:disable-next-line: new-parens
    repice.datePublication = (new Date).getTime();
    this.authService.getAuth().subscribe(user => {
      repice.userId = user.uid;
      repice.userName = user.displayName;
      this.repiceService.addRepice(repice);
    });
    this.router.navigate(['/admin']);
  }


}
