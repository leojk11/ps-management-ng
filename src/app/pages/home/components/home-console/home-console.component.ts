import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './home-console.component.html',
  styleUrls: ['./home-console.component.scss']
})
export class HomeConsoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
