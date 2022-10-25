import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConsoleComponent } from './components/console/console.component';
import { ConsolesStore } from './services/consoless.store';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

// primeng
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-consoles',
  standalone: true,
  imports: [
    CommonModule,
    ConsoleComponent,
    SpinnerComponent,
    ButtonModule,
    RouterModule
  ],
  providers: [
    ConsolesStore
  ],
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.scss']
})
export class ConsolesComponent implements OnInit {

  constructor(
    public consolesStore: ConsolesStore
  ) { }

  ngOnInit(): void {
    this.consolesStore.getConsoles();
  }

}
