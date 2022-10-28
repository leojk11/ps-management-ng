import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';
import { Settings } from '../models/settings.model';
import { SettingsService } from './settings.service';

export interface SettingsState {
  settings: Settings;
  games: Game[];

  gamesLoaded: boolean;
  loaded: boolean;
}

export const initialState: SettingsState = {
  settings: {} as Settings,
  games: [],

  gamesLoaded: false,
  loaded: false
}

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {

  settingsState = new BehaviorSubject<SettingsState>(initialState);
  public settingsState$ = this.settingsState.asObservable();

  constructor() { }

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

  pathGamesLoaded(gamesLoaded: boolean): void {
    this.settingsState.next({
      ...this.state,
      gamesLoaded
    });
  }

  setGames(games: Game[]): void {
    this.settingsState.next({
      ...this.state,
      games
    });
  }
}
