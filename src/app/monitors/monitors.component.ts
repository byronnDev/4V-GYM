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
    <!-- Search bar -->
    <div class="flex flex-wrap items-center justify-center border-2 border-custom-red rounded-lg w-3/5 bg-neutral-300 mb-20 mx-auto">
      <img src="../../assets/symbols_search.png" alt="search" class="w-8 h-8 m-2">
      <input id="search" type="text" class="flex-grow p-2 outline-none font-bold text-custom-red bg-neutral-300 text-2xl" [(ngModel)]="searchString" (input)="search()">
    </div>

    <!-- Boton para añadir monitores -->
    <button (click)="openModal()" class="absolute flex justify-end top-3.5 right-48 scale-150">
        <img src="../assets/mingcute_add-fill.png" alt="Add monitor">
    </button>

    <!-- Cards section -->
    <div class="flex flex-wrap space-x-10 justify-center items-center mb-24">
      <!-- Button to scroll left -->
      <button (click)="scrollLeft()">
        <img src="../../assets/flechas.png" alt="flecha" class="h-16">
      </button>
      <!-- Cards -->
      @for (data of filteredCards; track $index) {
        @if ($index >= firstCardIndex) { 
          @if ($index < firstCardIndex + 3) { <!-- 3 cards per page -->
            <div class="bg-neutral-300 w-1/5 h-72 pt-5 relative">
              <!-- Remove and edit buttons -->
              <button class="absolute top-4 left-4 text-xl text-bold text-amber-700" (click)="removeMonitor($index)">
                <img src="../../assets/ph_trash-fill.png" alt="remove">
              </button>
              <button class="absolute top-4 right-4 text-xl text-bold text-amber-700" (click)="openModalEdit($index)">
                <img src="../../assets/ic_round-edit.png" alt="edit">
              </button>
              <!-- Card content -->
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
      <!-- Button to scroll right -->
      <button (click)="scrollRight()">
        <img src="../../assets/flechas.png" alt="flecha" class="h-16 rotate-180">
      </button>
    </div>

    <!-- Modal -->
    @if (isModalOpen) {
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-70 transition backdrop-filter 
      backdrop-saturate-150 backdrop-blur-sm duration-300 ease-in-out">
      <div class="fixed inset-y-0 z-50 w-1/2 h-auto overflow-y-auto
          overflow-x-hidden bg-white rounded shadow-lg m-20">

        <div class="flex items-center justify-center">
          <div>
            <!-- Modal header -->
            <div class="flex relative">
              <img src="../assets/bi_person-fill.png" alt="person icon" class="mx-auto mt-4">
              <img src="../assets/mingcute_add-fill.png" alt="person icon" class="absolute bottom-7 right-14 h-8">
            </div>
            <!-- Modal body -->
            <div class="flex flex-col space-y-4">
              <!-- Name -->
              <input type="text" id="name" name="name" class="input h-12 w-full bg-neutral-400 rounded-lg text-3xl p-4" [(ngModel)]="name" (focus)="name === '' || name === getDefaultName() ? name = '' : null" (blur)="name === '' || name === getDefaultName() ? name = getDefaultName() : null" required>
              <!-- Email -->
              <input type="text" id="email" name="email" class="input h-12 w-full bg-neutral-400 rounded-lg text-3xl p-4" [(ngModel)]="email" (focus)="email === '' || email === getDefaultEmail() ? email = '' : null" (blur)="email === '' || email === getDefaultEmail() ? email = getDefaultEmail() : null" required="">
              <!-- Phone -->
              <input type="text" id="phone" name="phone" class="input h-12 w-full bg-neutral-400 rounded-lg text-3xl p-4" [(ngModel)]="phone" (focus)="phone === '' || phone === getDefaultPhone() ? phone = '' : null" (blur)="phone === getDefaultPhone() ? phone = getDefaultPhone() : null">

              <!-- Accept and cancel buttons -->
              <div class="flex justify-between space-x-6">
                <button (click)="updateMonitor(index)" class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
                  ACEPTAR
                </button>
                <button (click)="closeModal()" class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    `,
  styles: ``
})
export class MonitorsComponent {
  globalApi: GlobalApiService = new GlobalApiService();
  cards: Monitors[] = this.globalApi.monitors;

  filteredCards: Monitors[] = this.cards; // cards filtered by search

  firstCardIndex = 0; // index of the first card to show
  searchString = ''; // value of the search input

  isModalOpen = false; // true if the modal is open

  // Default values for the inputs
  index: number = -1; setDefaultIndex() { this.index = -1; }; getDefaultIndex() { return -1; };
  name: string = 'Nombre'; setDefaultName() { this.name = 'Nombre'; }; getDefaultName() { return 'Nombre'; };
  email: string = 'Email'; setDefaultEmail() { this.email = 'Email'; }; getDefaultEmail() { return 'Email'; };
  phone: string = 'Teléfono'; setDefaultPhone() { this.phone = 'Teléfono'; }; getDefaultPhone() { return 'Teléfono'; };

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

  removeMonitor(index: number) {
    this.globalApi.removeMonitor(this.cards[index]); // Remove the monitor from the global api
    this.updateMonitors(); // Update the cards array
  }

  openModal() {
    this.isModalOpen = true; // Open the modal
    // Set the default values for the inputs
    this.setDefaultIndex();
    this.setDefaultName();
    this.setDefaultEmail();
    this.setDefaultPhone();
  }

  openModalEdit(index: number) {
    this.isModalOpen = true; // Open the modal
    // Set the values for the inputs
    this.index = index;
    this.name = this.filteredCards[index].name;
    this.email = this.filteredCards[index].email;
    this.phone = this.filteredCards[index].phone ?? '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  setMonitor() {
    this.closeModal(); // Close the modal

    this.globalApi.addMonitor({
      id: this.globalApi.getLastId() + 1,
      name: this.name,
      email: this.email,
      phone: this.phone
    }); // Add the monitor to the global api

    this.cards = this.globalApi.monitors; // Update the cards array

    this.search(); // Update the filtered cards
  }

  updateMonitors() {
    this.cards = this.globalApi.monitors; // Update the cards array
    this.search(); // Update the filtered cards
    this.filteredCards = this.cards; // Update the filtered cards
  }

  updateMonitor(index: number) {
    if (this.index === this.getDefaultIndex()) {
      this.setMonitor();
      return;
    }

    this.globalApi.updateMonitor(this.cards[index].id, {
      id: this.cards[index].id,
      name: this.name,
      email: this.email,
      phone: this.phone
    }); // Update the monitor in the global api
    this.updateMonitors(); // Update the cards array
    this.closeModal(); // Close the modal
  }

}
