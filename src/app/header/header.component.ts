import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
  <header class="w-full h-32 bg-neutral-300">
    <img class="float-start w-28 h-28 m-2 ml-14" src="../../assets/mancuerna.png" alt="4VGYM">
    <div class="flex justify-center text-custom-red">
        <h2 class="text-center font-bold text-9xl" style="transform: scale(3); margin-top: 3%; margin-left: -14%;">4V
            GYM
        </h2>
    </div>
</header>
`,
  styles: ``
})
export class HeaderComponent {

}
