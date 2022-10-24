import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// primeng
import { ButtonModule } from 'primeng/button';
import { Console } from '../../models/console.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ConsolesService } from '../../services/consoles.service';

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
    private consolesService: ConsolesService
  ) { }

  ngOnInit(): void {
    console.log('console', this.console);
    
  }

  goToEdit(): void {
    this.router.navigate(['/new-console'], { queryParams: { id: this.console._id } });
  }

  delete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.consolesService.deleteConsole(this.console._id).subscribe({
          next: () => {
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
