import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  // @Input() variant: string = 'default';
  // @Input() label: string = 'Button';

  // @Output() onClick = new EventEmitter<void>();

  // handleClick() {
  //   this.onClick.emit();
  // }

  @Input() label: any = 'Click Me';
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'danger' =
    'default';
  @Input() backgroundColor: any = '#007bff'; // Default Blue
  @Input() textColor: any = '#ffffff'; // Default White
  @Input() borderRadius: any = '5px';
  @Input() padding: any = '10px 20px';
  @Input() disabled: boolean = false;
}
