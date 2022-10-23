import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-revenue.component.html',
  styleUrls: ['./single-revenue.component.scss']
})
export class SingleRevenueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
