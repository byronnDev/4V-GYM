import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: Add carrusel to show monitors
// TODO: Add modal to add monitors

interface Card {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap items-center justify-center border-2 border-custom-red rounded-lg w-3/5 bg-neutral-300 mb-20 mx-auto">
      <img src="../../assets/symbols_search.png" alt="search" class="w-8 h-8 m-2">
      <input type="text" class="flex-grow p-2 outline-none font-bold text-custom-red bg-neutral-300 text-2xl">
    </div>
    
    <div class="flex flex-wrap space-x-10 justify-center items-center mb-48">
        <button (click)="scrollLeft()">
          <img src="../../assets/flechas.png" alt="flecha" class="h-16">
        </button>
      @for (data of cards; track $index) {
        @if ($index <= 2) { <!-- Only show 3 cards -->
          <div class="bg-neutral-300 w-1/4">
            <div class="flex justify-center">
              <img src="../../assets/bi_person-fill.png" alt="person" class="h-36 w-36">
            </div>
            <div class="text-center">
              <p>{{data.name}}</p>
              <a href="mailto:{{data.email}}">{{data.email}}</a>
              <p>{{data.phone}}</p>
            </div>
          </div>
        }
      }
      <button (click)="scrollRight()">
        <img src="../../assets/flechas.png" alt="flecha" class="h-16 rotate-180">
      </button>
    </div>
    `,
  styles: `

  `
})
export class MonitorsComponent {
  cards: Card[] = [
    { id: 0, name: 'Miguel Goyena', email: 'miguel_goyena@cuatrovientos.org', phone: '643231413' },
    { id: 1, name: 'Ander', email: 'ander@gmail.com', phone: '643551231' },
    { id: 2, name: 'Jon', email: 'jon@gmail.com', phone: '948231413' },
    { id: 3, name: 'Iñigo', email: 'inigo_jimenez@cuatrovientos.org', phone: '543231413' },
  ];

  firstCardIndex = 0; // índice del primer card que se muestra

  scrollLeft() {
    if (this.firstCardIndex > 0) {
      this.firstCardIndex--;
    }
  }

  scrollRight() {
    if (this.firstCardIndex < this.cards.length - 3) {
      this.firstCardIndex++;
    }
  }

}
