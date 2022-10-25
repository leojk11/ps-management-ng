import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';
import { SettingsService } from './settings.service';

export interface SettingsState {
  settings: Settings;

  loaded: boolean;
}

export const initialState: SettingsState = {
  settings: {} as Settings,

  loaded: false
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {

  settingsState = new BehaviorSubject<SettingsState>(initialState);
  settingsState$ = this.settingsState.asObservable();

  constructor(
    private settingsService: SettingsService
  ) { }

  get state() {
    return this.settingsState.getValue();
  }

  setSettings(settings: Settings): void {
    this.settingsState.next({
      ...this.state,
      settings,
    });


  }

  patchLoaded(loaded: boolean): void {
    this.settingsState.next({
      ...this.state,
      loaded
    });
  }
}
