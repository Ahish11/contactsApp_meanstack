import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: ContactListComponent },
  { path: 'add-contact', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
