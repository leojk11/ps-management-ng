import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeConsoleComponent } from './components/home-console/home-console.component';
import { ConsolesStore } from '../consoles/services/consoless.store';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

// primeng
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeConsoleComponent,
    SpinnerComponent,
    ButtonModule,
    RouterModule
  ],
  providers: [
    ConsolesStore
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public consolesStore: ConsolesStore
  ) { }

  ngOnInit(): void {
    this.consolesStore.getConsoles();
  }

}
