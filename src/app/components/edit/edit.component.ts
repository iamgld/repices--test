import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Repice } from '../../interfaces/repice';
import { RepiceService } from '../../services/repice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  idRepice: string;
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
    private repiceService: RepiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDetailsRepice();
  }

  getDetailsRepice(): void {
    this.idRepice = this.route.snapshot.params.id
    this.repiceService.getRepice(this.idRepice)
      .subscribe(repice => this.repice = repice)
  }

  onSubmitForModifyRepice(repice: Repice): void {
    repice.id = this.idRepice;
    this.repiceService.updateRepice(repice);
    this.router.navigate([`/details/${this.idRepice}`]);
  }

}
