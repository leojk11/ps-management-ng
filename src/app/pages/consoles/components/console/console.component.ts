import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ConsolesService } from '../../services/consoles.service';
import { Console } from '../../models/console.model';

// primeng
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @Input() console: Console = {} as Console;

  @Output() onDelete = new EventEmitter<any>();

  timePlayed: string = '';

  displayInfoModal: boolean = false;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private consolesService: ConsolesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { 
    const hours = Math.floor(this.console.overall_time_played / 60);
    const minutes = this.console.overall_time_played % 60;

    this.timePlayed = `${ (hours < 10 ? '0' + hours : hours) }:${ (minutes < 10 ? '0' + minutes : minutes) }`;
  }

  toggleInfoModal(): void {
    this.displayInfoModal = !this.displayInfoModal;
  }

  goToEdit(event: any): void {
    event.stopPropagation();

    this.router.navigate(['/new-console'], { 
      queryParams: { id: this.console._id } 
    }).then();
  }

  delete(event: any): void {
    event.stopPropagation();

    this.confirmationService.confirm({
      message: `Дали си сигурен дека сакаш да ја избришеш конзолата <b>${ this.console.name }</b>?`,
      accept: () => {
        this.consolesService.deleteConsole(this.console._id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info', 
              summary: 'Конзолата е успешно избришана!', 
              detail: 'Порака од серверот!',
            });

            this.onDelete.emit();
          },
          error: () => {
            this.messageService.add({
              severity: 'info', 
              summary: 'Грешка при бришење на конзолата!', 
              detail: 'Порака од серверот!',
            });
          }
        });
      }
    });
  }

}
