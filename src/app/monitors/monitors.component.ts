import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalApiService, Monitors } from '../global-api.service';

//! TODO Add card icons/buttons and add button to add monitors

@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-wrap items-center justify-center border-2 border-custom-red rounded-lg w-3/5 bg-neutral-300 mb-20 mx-auto">
      <img src="../../assets/symbols_search.png" alt="search" class="w-8 h-8 m-2">
      <input id="search" type="text" class="flex-grow p-2 outline-none font-bold text-custom-red bg-neutral-300 text-2xl" [(ngModel)]="searchString" (input)="search()">
    </div>

    <div class="flex flex-wrap space-x-10 justify-center items-center mb-48">
      <button (click)="scrollLeft()">
        <img src="../../assets/flechas.png" alt="flecha" class="h-16">
      </button>
      @for (data of filteredCards; track $index) {
        @if ($index >= firstCardIndex) { 
          @if ($index < firstCardIndex + 3) { <!-- 3 cards per page -->
            <div class="bg-neutral-300 w-1/5 h-72 pt-5">
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
  globalApi: GlobalApiService = new GlobalApiService();
  cards: Monitors[] = this.globalApi.monitors;

  filteredCards: Monitors[] = this.cards; // cards filtered by search

  firstCardIndex = 0; // index of the first card to show
  searchString = ''; // value of the search input

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

  search() {
    if (this.searchString) {
      this.filteredCards = this.cards.filter(card => card.name.toLowerCase().includes(this.searchString.toLowerCase()));
    } else {
      this.filteredCards = this.cards;
    }
  }

}
