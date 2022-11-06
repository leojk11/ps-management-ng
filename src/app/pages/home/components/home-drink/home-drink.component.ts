import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Drink } from '../../models/drink.model';
import { DrinksService } from '../../services/drinks.service';

// primeng
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-drink',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-drink.component.html',
  styleUrls: ['./home-drink.component.scss']
})
export class HomeDrinkComponent implements OnInit {

  @Input() drink: Drink = {} as Drink;

  @Output() toggleEditModal = new EventEmitter<any>();

  showSellDialog: boolean = false;
  amountToSell: number = 0;
  totalPrice: number = 0;

  constructor(
    private drinksService: DrinksService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log(this.drink);
    
  }

  toggleSellModal(): void {
    this.showSellDialog = !this.showSellDialog;
  }

  sellClick(event: any): void {
    event.stopPropagation();
    this.toggleSellModal();
  }

  sell(): void {
    this.drinksService.sellDrink(this.drink._id, this.amountToSell).subscribe({
      next: res => {
        this.drink.total_amount = this.drink.total_amount - this.amountToSell;

        this.showSellDialog = false;
        this.amountToSell = 0;
        this.totalPrice = 0;

        this.messageService.add({
          severity: 'info', 
          summary: res.message, 
          detail: 'Порака од серверот!',
        });
      },
      error: () => {
        this.showSellDialog = false;
        this.amountToSell = 0;

        this.messageService.add({
          severity: 'info', 
          summary: 'Грешка при продажба на пијалок.', 
          detail: 'Порака од серверот!',
        });
      }
    });
  }

  calculateFinalPrice(event: any): void {
    this.totalPrice = this.drink.price * event.value;
  }

  resetSellModal(): void {
    this.totalPrice = 0;
    this.amountToSell = 0;
  }

}
