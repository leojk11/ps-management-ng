import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SettingsStore } from './services/settings.store';
import { SettingsService } from './services/settings.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { SingleGameComponent } from './components/single-game/single-game.component';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Game } from './models/game.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ToastModule,
    SingleGameComponent,
    DialogModule
  ],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    price_per_hour: ['', Validators.required]
  });

  gamesForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    year: ['', Validators.required]
  });

  displayModal: boolean = false;

  gameToEdit: Game = {} as Game;
  header: string = '';

  constructor(
    public settingsStore: SettingsStore,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.settingsStore.patchLoaded(false);
    this.settingsStore.pathGamesLoaded(false);

    this.settingsService.getSettings().subscribe({
      next: res => {
        this.form.patchValue({ ...res });
        
        this.settingsStore.setSettings(res);
        this.settingsStore.patchLoaded(true);

        this.settingsService.getGames().subscribe({
          next: gamesRes => {
            this.settingsStore.setGames(gamesRes);
            this.settingsStore.pathGamesLoaded(true);
          },
          error: error => {
            this.messageService.add({
              severity: 'info', 
              summary: error.error.message, 
              detail: 'Error message',
            });
          }
        })
      },
      error: error => {
        this.messageService.add({
          severity: 'info', 
          summary: error.error.message, 
          detail: 'Error message',
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.settingsStore.patchLoaded(false);
    this.settingsStore.pathGamesLoaded(false);
  }

  handleSubmit(): void {
    this.settingsService.editSettings(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info', 
          summary: 'Промените се успешно зачувани.', 
          detail: 'Порака од серверот!',
        });
      },
      error: error => {
        this.messageService.add({
          severity: 'info', 
          summary: error.error.message, 
          detail: 'Error message',
        });
      }
    });
  }

  handleGameFormSubmit(): void {
    console.log(this.gamesForm.value);
    
    if (this.gameToEdit._id) {
      this.settingsService.editGame(this.gamesForm.value, this.gameToEdit._id).subscribe({
        next: res => {
          this.messageService.add({
            severity: 'info', 
            summary: 'Промените се успешно зачувани.', 
            detail: 'Порака од серверот!',
          });
          
          this.toggleModal();
          this.settingsStore.pathGamesLoaded(false);
  
          this.settingsService.getGames().subscribe({
            next: gamesRes => {
              this.settingsStore.setGames(gamesRes);
              this.settingsStore.pathGamesLoaded(true);

              this.gamesForm.reset();
            },
            error: error => {
              this.messageService.add({
                severity: 'info', 
                summary: error.error.message, 
                detail: 'Error message',
              });
            }
          })
        }
      });
    } else {
      this.settingsService.addGame(this.gamesForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info', 
            summary: 'Нова игра е успешно додадена.', 
            detail: 'Порака од серверот!',
          });
          
          this.toggleModal();
          this.settingsStore.pathGamesLoaded(false);

          this.settingsService.getGames().subscribe({
            next: gamesRes => {
              this.settingsStore.setGames(gamesRes);
              this.settingsStore.pathGamesLoaded(true);

              this.gamesForm.reset();
            },
            error: error => {
              this.messageService.add({
                severity: 'info', 
                summary: error.error.message, 
                detail: 'Error message',
              });
            }
          })
        },
        error: error => {
          this.messageService.add({
            severity: 'info', 
            summary: error.error.message, 
            detail: 'Error message',
          });
        }
      });
    }
  }

  toggleModal(): void {
    if (this.gameToEdit._id) {
      this.header = `Измени ја играта`;
    } else {
      this.header = `Додај нова игра`;
    }
    this.displayModal = !this.displayModal;
  }

  toEditGame(game: Game): void {
    this.gameToEdit = game;
    this.gamesForm.patchValue({ ...game });

    this.toggleModal();
  }
  resetGameToEdit(): void {
    this.gameToEdit = {} as Game;
    this.gamesForm.reset();
  }

  deleteGame(): void {
    this.settingsStore.pathGamesLoaded(false);

    this.settingsService.getGames().subscribe({
      next: gamesRes => {
        this.settingsStore.setGames(gamesRes);
        this.settingsStore.pathGamesLoaded(true);
      },
      error: error => {
        this.messageService.add({
          severity: 'info', 
          summary: error.error.message, 
          detail: 'Error message',
        });
      }
    })
  }

}
