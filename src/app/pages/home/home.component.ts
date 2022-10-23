import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConsoleComponent } from './components/home-console/home-console.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeConsoleComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
