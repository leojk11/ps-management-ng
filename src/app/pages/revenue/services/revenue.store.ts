import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Revenue } from '../models/revenue.model';
import { TotalEarning } from '../models/totalEarning.model';
import { RevenueParams, RevenueService } from './revenue.service';

export interface RevenueState {
  revenues: any;
  totalEarning: TotalEarning;

  drinkRevenues: any;
  totalDrinkEarning: TotalEarning;

  totalEarningLoaded: boolean;
  loaded: boolean;
  drinksLoaded: boolean;
  totalDrinkEarningsLoaded: boolean;

  params: RevenueParams;
}

export const initialState: RevenueState = {
  revenues: [],
  totalEarning: {} as TotalEarning,

  drinkRevenues: [],
  totalDrinkEarning: {} as TotalEarning,
  
  totalEarningLoaded: false,
  loaded: false,
  drinksLoaded: false,
  totalDrinkEarningsLoaded: false,

  params: {}
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

  setDrinkLoaded(drinksLoaded: boolean): void {
    this.patchState({ drinksLoaded });
  }
  setTotalDrinksEarningsLoaded(totalDrinkEarningsLoaded: boolean): void {
    this.patchState({ totalDrinkEarningsLoaded });
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

  load = this.effect((params$: Observable<Partial<RevenueParams>>) => params$
    .pipe(tap(() => this.patchState({ loaded: false, revenues: [] })),
      switchMap(params => {
        const currentParams = this.get(s => s.params);
        const newParams = { ...currentParams, ...params };

        return this.revenueService.filterRevenue(newParams).pipe(tap((response: HttpResponse<Revenue[]>) => {
              this.patchState({
                loaded: true,
                params: newParams,
                revenues: response.body
              });
            }
          ), catchError(() => {
              this.patchState({
                revenues: [], loaded: false,
                params: initialState.params
              });
              return EMPTY;
            }
          )
        );
      })
    ));

  getTotalEarning(): void {
    this.setTotaleEarningLoaded(false);
    this.revenueService.getTotalEarning().subscribe({
      next: res => {
        this.patchState({
          totalEarning: res,
          totalEarningLoaded: true
        });
      }
    });
  }

  getTotalDrinkEarning(): void {
    this.setTotalDrinksEarningsLoaded(false);
    this.revenueService.getTotalDrinksEarnings().subscribe({
      next: res => {
        this.patchState({
          totalDrinkEarning: res,
          totalDrinkEarningsLoaded: true
        });
      }
    });
  }

  resetParams(): void {
    this.patchState({
      params: {}
    });
  }

}
