import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, MainLayoutComponent]
})
export class AppComponent {
  title = 'ps-management';
}
