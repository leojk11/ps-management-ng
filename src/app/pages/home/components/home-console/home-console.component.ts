import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Console } from 'src/app/pages/consoles/models/console.model';
import { ConsolesService } from 'src/app/pages/consoles/services/consoles.service';
import * as dayjs from 'dayjs';
import { DialogModule } from 'primeng/dialog';
import { SettingsStore } from 'src/app/pages/settings/services/settings.store';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleStatus } from 'src/app/pages/consoles/enums/consoleStatus.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-console',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    FormsModule,ReactiveFormsModule
  ],
  templateUrl: './home-console.component.html',
  styleUrls: ['./home-console.component.scss']
})
export class HomeConsoleComponent implements OnInit {

  @Input() console: Console = {} as Console;

  displayModal: boolean = false;
  disabledModalBtn: boolean = false;

  inProgress: boolean = false;

  priceToPay: number = 0;
  manualPriceToPay: number = 0;

  pricePerHour: number = 0;

  timePlayed: string = '';
  overallTimePlayed: string = '';
  minutesPlayed: number = 0;

  bodyToSave: any = {};

  hrsDiff: number = 0;
  minstDiff: number = 0;

  mapConsoleStatus: any = {
    'FREE': 'Слободно',
    'BUSY': 'Зафатено'
  }

  constructor(
    private consolesService: ConsolesService,
    private settingsStore: SettingsStore,
    private authState: AuthService
  ) { }

  ngOnInit(): void {
    console.log('console', this.console);
    
    this.settingsStore.settingsState$.subscribe({
      next: state => {
        this.pricePerHour = state.settings.price_per_hour;
      }
    });

    const hours = Math.floor(this.console.overall_time_played / 60);
    const minutes = this.console.overall_time_played % 60;

    this.overallTimePlayed = `${ hours }:${ minutes }`;

    this.updateTimePlayed();

    if (this.console.status === ConsoleStatus.BUSY) {
      setTimeout(() => {
        this.updateTimePlayed();
      }, 60000);
    }
  }

  start(): void {
    this.inProgress = true;

    const now = new Date();
    this.console.start_time = now.toString();

    this.consolesService.start(this.console._id, now).subscribe({
      next: () => {
        this.console.playing = true;
        this.console.status = ConsoleStatus.BUSY;
        this.inProgress = false;

        setTimeout(() => {
          if (this.console.status === ConsoleStatus.BUSY) {
            this.updateTimePlayed();
          }
        }, 60000);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  updateTimePlayed(): void {
    if (this.console.start_time) {
      const startTime = new Date(this.console.start_time);
      const now = new Date();
      // now.setHours(24, 13, 0);
  
      const diffMs = (now.valueOf() - startTime.valueOf());
      const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      this.timePlayed = `${ (diffHrs < 10 ? '0' : '') + diffHrs }:${ (diffMins < 10 ? '0' : '') + diffMins }`;
  
      const hoursInMinutes = diffHrs * 60;
      const allMinutes = hoursInMinutes + diffMins;
      this.minutesPlayed = allMinutes;
      const endHours = allMinutes / 60;
  
      this.priceToPay = Math.ceil(endHours * this.pricePerHour);
    }
  }

  stop(): void {
    this.inProgress = true;
    this.displayModal = true;
  }

  sendStop(): void {

    this.disabledModalBtn = true;

    let priceToSave;
    if (this.manualPriceToPay > 0) {
      priceToSave = this.manualPriceToPay;
    } else {
      priceToSave = this.priceToPay;
    }

    const today = new Date();

    const body = {
      price_to_pay: priceToSave,
      time_played: this.minutesPlayed,
      date: dayjs(today).format('DD/MM/YYYY'),
      user: this.authState.state.user
    };

    console.log(body);
    

    this.consolesService.stop(this.console._id, body).subscribe({
      next: () => {
        this.console.playing = false;
        this.console.status = ConsoleStatus.FREE;
        this.inProgress = false;

        this.timePlayed = '';
        this.manualPriceToPay = 0;
        this.priceToPay = 0;

        this.displayModal = false;
        this.disabledModalBtn = false;

      },
      error: error => {
        this.disabledModalBtn = false;
        console.log(error);
      }
    });
  }

}
