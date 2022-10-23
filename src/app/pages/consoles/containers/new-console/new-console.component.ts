import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-new-console',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './new-console.component.html',
  styleUrls: ['./new-console.component.scss']
})
export class NewConsoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
