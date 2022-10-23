import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { SingleRevenueComponent } from './components/single-revenue/single-revenue.component';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    SingleRevenueComponent
  ],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
