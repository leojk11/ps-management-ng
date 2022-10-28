import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Game } from '../../models/game.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-single-game',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmDialogModule],
  providers: [
    ConfirmationService
  ],
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  @Input() game: Game = {} as Game;

  @Output() toEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(
    private confirmationService: ConfirmationService,
    private settingsService: SettingsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  onClick(): void {
    this.toEdit.emit(this.game);
  }

  delete(event: any): void {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: `Дали си сигурен дека сакаш да ја избришеш играта <b>${ this.game.name } ${ this.game.year }</b>?`,
      accept: () => {
        this.settingsService.deleteGame(this.game._id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info', 
              summary: 'Конзолата е успешно избришана!', 
              detail: 'Порака од серверот!',
            });

            this.onDelete.emit();
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }

}
