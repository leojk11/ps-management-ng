import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings.model';

export interface SettingsState {
  settings: Settings;
}

export const initialState: SettingsState = {
  settings: {} as Settings
}

@Injectable()
export class SettingsStore {

  settingsState = new BehaviorSubject<SettingsState>(initialState);
  settingsState$ = this.settingsState.asObservable();

  constructor() { }

  get state() {
    return this.settingsState.getValue();
  }
}
