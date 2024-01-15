import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// TODO: Add carrusel to show monitors
// TODO: Add modal to add monitors

interface Card {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div class="flex space-x-6">
        <button (click)="prevCard()" class="absolute top-0 left-0 z-10 p-4 bg-blue-500 text-white rounded-full
    focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <div class="w-full">
          <div class="flex space-x-6">
            <!-- Aquí se renderizarán las tarjetas -->
            <div *ngFor="let card of cards" class='bg-gray-100 rounded-lg shadow p-4 w-full'> <!-- Añade las clases y estilos aquí -->
              <h2 class="text-xl font-semibold mb-2">{{ card.title }}</h2>
              <p class="whitespace-pre-wrap">{{ card.description }}</p>
            </div>
          </div>
        </div>

        <button (click)="nextCard()" class="absolute top-0 right-0 z-10 p-4 bg-blue-500 text-white rounded-full
    focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 19.5L15.75 12l-7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: `
  `
})
export class MonitorsComponent implements OnInit {
  cards: Card[] = [
    { id: 1, title: 'Card 1', description: 'Este es el contenido de la tarjeta 1.' },
    { id: 2, title: 'Card 2', description: 'Este es el contenido de la tarjeta 2.' },
    { id: 3, title: 'Card 3', description: 'Este es el contenido de la tarjeta 3.' },
    { id: 4, title: 'Card 4', description: 'Este es el contenido de la tarjeta 4.' },
    { id: 5, title: 'Card 5', description: 'Este es el contenido de la tarjeta 5.' }
  ];
  currentIndex = 0;

  ngOnInit(): void { }

  prevCard(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.cards.length - 1;
    }
  }

  nextCard(): void {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

}
