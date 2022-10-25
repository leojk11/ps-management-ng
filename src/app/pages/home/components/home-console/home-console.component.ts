import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Console } from 'src/app/pages/consoles/models/console.model';
import { ConsolesService } from 'src/app/pages/consoles/services/consoles.service';
import * as dayjs from 'dayjs';
import { DialogModule } from 'primeng/dialog';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import { SettingsStore } from 'src/app/pages/settings/services/settings.store';

@Component({
  selector: 'app-home-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './home-console.component.html',
  styleUrls: ['./home-console.component.scss']
})
export class HomeConsoleComponent implements OnInit {

  @Input() console: Console = {} as Console;

  displayModal: boolean = false;

  inProgress: boolean = false;

  priceToPay: number = 0;

  pricePerHour: number = 0;
  hoursPlayed: number = 0;
  minutesPlayed: number = 0;

  timePlayed: string = '';

  constructor(
    private consolesService: ConsolesService,
    private settingsStore: SettingsStore
  ) { }

  ngOnInit(): void {
    this.settingsStore.settingsState$.subscribe({
      next: state => {
        this.pricePerHour = state.settings.price_per_hour;
      }
    });
  }

  start(): void {
    this.inProgress = true;

    const now = new Date();
    console.log('now', now);
    this.console.start_time = now.toString();
    

    this.consolesService.start(this.console._id, now).subscribe({
      next: () => {
        this.console.playing = true;
        this.inProgress = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  stop(): void {
    this.inProgress = true;

    const startTime = new Date(this.console.start_time);
    const now = new Date();
    now.setHours(now.getHours() + 5);

    var hours = Math.abs(startTime.valueOf() - now.valueOf()) / 3.6e6;
    
    const priceToPay = Math.floor(hours) * this.pricePerHour;
    this.priceToPay = priceToPay;

    var diffMs = (now.valueOf() - startTime.valueOf());
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    this.timePlayed = `${ diffHrs }:${ diffMins }`;

    this.displayModal = true;
    
    this.consolesService.stop(this.console._id).subscribe({
      next: () => {
        this.console.playing = false;
        this.inProgress = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
