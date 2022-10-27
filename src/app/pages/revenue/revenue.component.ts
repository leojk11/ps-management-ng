import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleRevenueComponent } from './components/single-revenue/single-revenue.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

import { RevenueStore } from './services/revenue.store';

// primeng
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    SingleRevenueComponent,
    SpinnerComponent
  ],
  providers: [
    RevenueStore
  ],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  constructor(
    public revenueStore: RevenueStore
  ) { }

  ngOnInit(): void {
    this.revenueStore.getRevenues();
    this.revenueStore.getTotalEarning();
  }

  testDateChange(event: any): void {
    console.log('date change event', event);
    
  }
}
