import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Revenue } from '../models/revenue.model';
import { TotalEarning } from '../models/totalEarning.model';
import { RevenueService } from './revenue.service';

export interface RevenueState {
  revenues: Revenue[];
  totalEarning: TotalEarning;

  totalEarningLoaded: boolean;
  loaded: boolean;
}

export const initialState: RevenueState = {
  revenues: [],
  totalEarning: {} as TotalEarning,
  
  totalEarningLoaded: false,
  loaded: false
}

@Injectable()
export class RevenueStore extends ComponentStore<RevenueState> {

  constructor(
    private revenueService: RevenueService
  ) {
    super(initialState);
  }

  setLoaded(loaded: boolean): void {
    this.patchState({ loaded });
  }
  setTotaleEarningLoaded(totalEarningLoaded: boolean): void {
    this.patchState({ totalEarningLoaded });
  }

  getRevenues(): void {
    this.setLoaded(false);
    this.revenueService.getRevenues().subscribe({
      next: res => {
        this.patchState({
          revenues: res,
          loaded: true
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getTotalEarning(): void {
    this.setTotaleEarningLoaded(false);
    this.revenueService.getTotalEarning().subscribe({
      next: res => {
        this.patchState({
          totalEarning: res,
          totalEarningLoaded: true
        })
      }
    })
  }

}
