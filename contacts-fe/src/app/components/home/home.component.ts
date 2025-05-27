import { Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { LoaderUiComponent } from "../common/loader-ui/loader-ui.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactListComponent, LoaderUiComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
