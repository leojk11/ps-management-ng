import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ConsolesService } from '../../services/consoles.service';
import { Console } from '../../models/console.model';

// primeng
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule
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

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private consolesService: ConsolesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  goToEdit(): void {
    this.router.navigate(['/new-console'], { queryParams: { id: this.console._id } }).then();
  }

  delete(): void {
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
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }

}
