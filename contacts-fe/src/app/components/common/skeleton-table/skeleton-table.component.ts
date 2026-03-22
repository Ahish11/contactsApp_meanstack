import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-table.component.html',
  styleUrl: './skeleton-table.component.scss'
})
export class SkeletonTableComponent {
  // Configurable rows, default is 5 as in example
  @Input() rows: number = 5;
  
  get rowsArray() {
    return new Array(this.rows).fill(0);
  }
}
