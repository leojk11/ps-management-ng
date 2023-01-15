import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleRevenueComponent } from './components/single-revenue/single-revenue.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';

import { RevenueStore } from './services/revenue.store';
import { RevenueParams } from './services/revenue.service';

import { ConsolesService } from '../consoles/services/consoles.service';

// primeng
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, takeUntil } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';

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
    ReactiveFormsModule,
    TabViewModule,
    PaginatorModule,
    ScrollingModule
  ],
  providers: [
    RevenueStore,
    CdkVirtualScrollViewport
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  
  params: RevenueParams = {};

  day: any = null;
  month: any = null;
  year: any = null;

  mapConsole: { [k: string]: string } = {};

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport = {} as CdkVirtualScrollViewport;
  destroy$ = new Subject<void>();

  constructor(
    public revenueStore: RevenueStore,
    private consoleService: ConsolesService,
    private scrollDispatcher: ScrollDispatcher
  ) { }

  ngOnInit(): void {
    this.revenueStore.getRevenues();
    this.consoleService.getConsoles().subscribe({
      next: consoles => {
        for (const console of consoles) {
          this.mapConsole[console._id] = `${ console.name }`;
        }

        this.revenueStore.getTotalEarning();
        this.revenueStore.load({});

        // this.revenueStore.getTotalDrinkEarning();
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
