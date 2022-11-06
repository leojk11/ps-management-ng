import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Drink } from '../../models/drink.model';
import { DrinksService } from '../../services/drinks.service';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-drink',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './new-drink.component.html',
  styleUrls: ['./new-drink.component.scss']
})
export class NewDrinkComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Input() drinkToEdit: Drink = {} as Drink;

  @Output() onClose = new EventEmitter<any>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    total_amount: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private drinksService: DrinksService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.editMode) {
      this.form.patchValue({ ...this.drinkToEdit });
    }
  }

  handleSubmit(): void {
    console.log(this.form.value);

    if (this.editMode) {
      this.drinksService.editDrink(this.drinkToEdit._id, this.form.value).subscribe({
        next: () => {
          this.onClose.emit();
          
          this.messageService.add({
            severity: 'info', 
            summary: 'Пијалокот е успешно изменет.', 
            detail: 'Порака од серверот!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'info', 
            summary: 'Грешка при промена на пијалокот.', 
            detail: 'Порака од серверот!',
          });
        }
      });
    } else {
      this.drinksService.addNewDrink(this.form.value).subscribe({
        next: () => {
          this.onClose.emit();

          this.messageService.add({
            severity: 'info', 
            summary: 'Пијалокот е успешно додаден.', 
            detail: 'Порака од серверот!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'info', 
            summary: 'Грешка при додавање нов пијалок.', 
            detail: 'Порака од серверот!',
          });
        }
      });
    }
  }

  delete(): void {
    this.drinksService.deleteDrink(this.drinkToEdit._id).subscribe({
      next: () => {
        this.onClose.emit();

        this.messageService.add({
          severity: 'info', 
          summary: 'Пијалокот е успешно избришан.', 
          detail: 'Порака од серверот!',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'info', 
          summary: 'Грешка при бришење на пијалокот.', 
          detail: 'Порака од серверот!',
        });
      }
    });
  }

}
