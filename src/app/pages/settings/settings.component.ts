import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SettingsStore } from './services/settings.store';
import { SettingsService } from './services/settings.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ToastModule,
  ],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    price_per_hour: ['', Validators.required]
  });

  constructor(
    public settingsStore: SettingsStore,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe({
      next: res => {
        this.form.patchValue({ ...res });
        
        this.settingsStore.setSettings(res);
        this.settingsStore.patchLoaded(true);
      },
      error: error => {
        this.messageService.add({
          severity: 'info', 
          summary: error.error.message, 
          detail: 'Error message',
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.settingsStore.patchLoaded(false);
  }

  handleSubmit(): void {
    this.settingsService.editSettings(this.form.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info', 
          summary: 'Промените се успешно зачувани.', 
          detail: 'Порака од серверот!',
        });
      },
      error: error => {
        this.messageService.add({
          severity: 'info', 
          summary: error.error.message, 
          detail: 'Error message',
        });
      }
    });
  }

}
