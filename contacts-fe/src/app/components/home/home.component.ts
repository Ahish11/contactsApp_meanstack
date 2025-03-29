import { Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
