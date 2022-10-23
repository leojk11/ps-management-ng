import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menuItem.model';

export interface LayoutState {
  footerMenus: MenuItem[];
}

export const initialState: LayoutState = {
  footerMenus: [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routeTo: 'home'
    },
    {
      label: 'Consoles',
      icon: 'pi pi-prime',
      routeTo: 'consoles'
    },
    {
      icon: 'pi pi-plus',
      routeTo: 'new-console',
      circle: true
    },
    {
      label: 'Revenue',
      icon: 'pi pi-wallet',
      routeTo: 'revenue'
    },
    {
      label: 'Settings',
      icon: 'pi pi-sliders-h',
      routeTo: 'settings'
    },
  ]
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  layoutState = new BehaviorSubject<LayoutState>(initialState);
  layoutState$ = this.layoutState.asObservable();

  constructor() { }

  get state() {
    return this.layoutState.getValue();
  }
}
