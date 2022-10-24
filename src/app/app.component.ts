import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout.component';

import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, ToastModule],
  providers: [MessageService]
})
export class AppComponent {
  title = 'ps-management';
}
