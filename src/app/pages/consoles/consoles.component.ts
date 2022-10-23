import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './components/console/console.component';

@Component({
  selector: 'app-consoles',
  standalone: true,
  imports: [
    CommonModule,
    ConsoleComponent
  ],
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.scss']
})
export class ConsolesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
