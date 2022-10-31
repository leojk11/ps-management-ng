import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './layout/main-layout.component';
import { AuthService } from './core/services/auth.service';
import { SettingsStore } from './pages/settings/services/settings.store';
import { SettingsService } from './pages/settings/services/settings.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

// primeng
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    MainLayoutComponent, 
    ToastModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent
  ],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  loaded: boolean = false;

  displayModal: boolean = false;

  username: string = '';
  
  constructor(
    private authState: AuthService,
    private settingsStore: SettingsStore,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    const psUser = localStorage.getItem('psUser');

    if(psUser) {
      this.authState.setUser(psUser);
    } else {
      this.displayModal = true;
    }

    this.settingsService.getSettings().subscribe({
      next: res => {
        this.settingsService.getGames().subscribe({
          next: gamesRes => {
            this.settingsStore.setSettings(res);
            this.settingsStore.setGames(gamesRes);

            this.loaded = true;
          },
          error: () => {
            this.loaded = true;
          }
        })
      }
    });
  }

  login(): void {
    console.log('username', this.username);
    this.authState.setUser(this.username);
    this.displayModal = false;
  }
}
