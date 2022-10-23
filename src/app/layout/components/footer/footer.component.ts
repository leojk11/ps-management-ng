import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

}
