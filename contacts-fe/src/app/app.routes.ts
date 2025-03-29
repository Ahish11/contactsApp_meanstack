import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:ContactListComponent },
];
