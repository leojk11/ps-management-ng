import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './layout/main-layout.component';
import { AuthService } from './core/services/auth.service';

// primeng
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MainLayoutComponent, 
    ToastModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  displayModal: boolean = false;

  username: string = '';
  
  constructor(
    private authState: AuthService
  ) { }

  ngOnInit(): void {
    const psUser = localStorage.getItem('psUser');

    if(psUser) {
      this.authState.setUser(psUser);
    } else {
      this.displayModal = true;
    }
  }

  login(): void {
    console.log('username', this.username);
    this.authState.setUser(this.username);
    this.displayModal = false;
  }
}
