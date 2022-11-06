import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleRevenueComponent } from './components/single-revenue/single-revenue.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RevenueStore } from './services/revenue.store';
import { RevenueParams } from './services/revenue.service';

import { ConsolesService } from '../consoles/services/consoles.service';
import { Console } from '../consoles/models/console.model';

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
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RevenueStore
  ],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  
  params: RevenueParams = {};

  day: any = null;
  month: any = null;
  year: any = null;

  mapConsole: { [k: string]: string } = {};

  constructor(
    public revenueStore: RevenueStore,
    private consoleService: ConsolesService
  ) { }

  ngOnInit(): void {
    // this.revenueStore.getRevenues();
    this.consoleService.getConsoles().subscribe({
      next: consoles => {
        for (const console of consoles) {
          this.mapConsole[console._id] = `${ console.name }`;
        }

        this.revenueStore.getTotalEarning();
        this.revenueStore.load({});

        this.revenueStore.getTotalDrinkEarning();
      }
    });
  }

  dateChange(event: any, type: string): void {
    const date = new Date(event);

    if (type === 'day') {
      this.params.day = date.getDate();
    }

    if (type === 'month') {
      this.params.month = date.getMonth() + 1;
    }

    if (type === 'year') {
      this.params.year = date.getFullYear();
    }
    
  }

  filter(): void {
    this.revenueStore.load({ ...this.params });
  }
  resetFilter(): void {
    this.params = {};

    this.day = null;
    this.month = null;
    this.year = null;

    this.revenueStore.resetParams();
    this.revenueStore.load({});
  }
}
