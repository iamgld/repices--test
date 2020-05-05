import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs';
import { RepiceService } from './../../services/repice.service';
import { Repice } from '../../interfaces/repice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  repices: Repice[];
  @ViewChild('Repices') masonryContainer: ElementRef;

  constructor(
    private repiceService: RepiceService
  ) { }

  ngOnInit(): void {
    this.getAllRepices();
  }

  ngAfterViewInit(): void {
    this.buildLayoutRepices();
  }

  buildLayoutRepices(): void {
    // ciclo recursivo que espera tener la data para crear el masonry
    this.repices
      ? this.masonryLayout(
        // le pasamos el elemento que contendra a los items del masonry
        this.masonryContainer.nativeElement,
        // le pasamos los items del masonry
        this.masonryContainer.nativeElement.querySelectorAll('article')
      )
      : setTimeout(() => this.buildLayoutRepices(), 250);
  }

  getAllRepices(): void {
    this.repiceService.getAllRepices()
      .subscribe(repices => {
        this.repices = repices;
      });
  }

  masonryLayout(masonryContainer, masonryItems): void {
    // console.dir(masonryContainer, masonryItems);
    masonryContainer.classList.add('Masonry');
    // obtenemos la variable columns del css para saber cuantas columnas tendra el masonry
    // tslint:disable-next-line: radix
    const columns = parseInt(getComputedStyle(masonryContainer).getPropertyValue('--columns'));
    const masonryColumns = [];
    // creamos la cantidad de elementos que seran columnas y el agregamos sus clases
    for (let i = 1; i <= columns; i++) {
      // creamos la columna
      const column = document.createElement('section');
      column.classList.add('Masonry-column', `column-${i}`);
      // la agregamos al elemento contenedor
      masonryContainer.appendChild(column);
      // la agregamos al array que contiene las columnas
      masonryColumns.push(column);
    }
    // ubicamos cada elemento en la columna correspondiente
    for (let m = 0; m < Math.ceil(masonryItems.length / columns); m++) {
      for (let n = 0; n < columns; n++) {
        const item = masonryItems[m * columns + n];
        if (item) {
          masonryColumns[n].appendChild(item);
          item.classList.add('Masonry-item');
        }
      }
    }
  }

}
