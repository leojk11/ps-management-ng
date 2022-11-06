import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeConsoleComponent } from './components/home-console/home-console.component';
import { ConsolesStore } from '../consoles/services/consoless.store';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { HomeDrinkComponent } from './components/home-drink/home-drink.component';
import { NewDrinkComponent } from './components/new-drink/new-drink.component';
import { DrinksStore } from './services/drinks.store';

// primeng
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { Drink } from './models/drink.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeConsoleComponent,
    SpinnerComponent,
    ButtonModule,
    RouterModule,
    TabViewModule,
    HomeDrinkComponent,
    DialogModule,
    NewDrinkComponent
  ],
  providers: [
    ConsolesStore,
    DrinksStore
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tabsActiveIndex: number = 0;

  drinkEditMode: boolean = false;
  showDrinksModal: boolean = false;
  drinksModalHeader: string = '';
  drinkToEdit: Drink = {} as Drink;

  constructor(
    public consolesStore: ConsolesStore,
    public drinksStore: DrinksStore
  ) { }

  ngOnInit(): void {
    this.consolesStore.getConsoles();
    this.drinksStore.getDrinks();
  }

  toggleDrinksModal(editMode: boolean, event?: any): void {
    console.log('event', event);

    if (event) {
      this.drinkToEdit = event;
    } else {
      this.drinkToEdit = {} as Drink;
    }

    if (editMode) {
      this.drinkEditMode = true;
      this.drinksModalHeader = 'Измени го пијалокот';
    } else {
      this.drinkEditMode = false;
      this.drinksModalHeader = 'Додај нов пијалок'
    }

    this.showDrinksModal = !this.showDrinksModal;

    if (!this.showDrinksModal) {
      this.drinksStore.getDrinks();
    }
  }
}
