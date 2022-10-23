import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
