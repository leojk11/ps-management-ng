import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Console } from '../models/console.model';
import { ConsolesService } from './consoles.service';

export interface ConsolesState {
  consoles: Console[];

  loaded: boolean;
}

export const initialState: ConsolesState = {
  consoles: [],
  
  loaded: false
}

@Injectable()
export class ConsolesStore extends ComponentStore<ConsolesState> {

  constructor(
    private consolesService: ConsolesService
  ) { 
    super(initialState);
  }

  getConsoles(): void {
    this.patchState({ loaded: false });
    
    this.consolesService.getConsoles().subscribe({
      next: res => {
        this.patchState({ consoles: res, loaded: true });
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
