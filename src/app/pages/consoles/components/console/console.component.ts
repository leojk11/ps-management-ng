import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
