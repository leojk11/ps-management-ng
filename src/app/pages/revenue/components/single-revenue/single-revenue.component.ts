import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Revenue } from '../../models/revenue.model';

@Component({
  selector: 'app-single-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-revenue.component.html',
  styleUrls: ['./single-revenue.component.scss']
})
export class SingleRevenueComponent implements OnInit {

  @Input() revenue: Revenue = {} as Revenue;

  constructor() { }

  ngOnInit(): void {
  }

}
