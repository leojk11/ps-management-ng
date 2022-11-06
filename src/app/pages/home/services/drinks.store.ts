import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MessageService } from 'primeng/api';
import { Drink } from '../models/drink.model';
import { DrinksService } from './drinks.service';

export interface DrinksState {
  drinks: Drink[];

  loaded: boolean;
}

export const initialState: DrinksState = {
  drinks: [],

  loaded: false
}

@Injectable()
export class DrinksStore extends ComponentStore<DrinksState> {

  constructor(
    private drinksService: DrinksService,
    private messageService: MessageService
  ) { 
    super(initialState);
  }

  get state() {
    return this.get(s => s);
  }

  toggleLoaded(loaded: boolean): void {
    this.patchState({ loaded });
  }

  getDrinks(): void {
    this.toggleLoaded(false);
    
    this.drinksService.getAllDrinks().subscribe({
      next: drinks => {
        this.patchState({
          drinks,
          loaded: true
        });
      },
      error: error => {
        console.log(error);
        
        this.patchState({
          drinks: [],
          loaded: true
        });

        this.messageService.add({
          severity: 'info', 
          summary: 'Грешка при превземање на пијалоци.', 
          detail: 'Порака од серверот!',
        });
      }
    });
  }
}
