import { Contact } from './../../interface/contactList';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ContactListService } from '../../shared/contactList/contact-list.service';
import { catchError, finalize, Observable, of } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../datatable/datatable.component';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule, DatatableComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  // constructor(http: HttpClient) {
  // }
  // or
  // customerList: Observable<any[]> = new Observable<any[]>();
  // customerListServices = inject(ContactListService); //in ang 18
  // ngOnInit(): void {
  //   this.customerListFn();
  //   console.log(this.customerListFn());
  // }
  // customerListFn() {
  //   this.customerList = this.customerListServices.getContactList()
  // }

  constructor(private http: HttpClient, private loaderService: LoaderService) {}
  private contactService = inject(ContactListService); // Inject service using inject()
  searchText = '';
  contacts: Contact[] = [];
  tempContacts: Contact[] = [];
  contactListHeader: (keyof Contact)[] = [];
  // contactListHeader: string[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.loaderService.show();
    this.contactService
      .getContactList()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          this.tempContacts = contacts;
          if (this.contacts.length > 0) {
            this.contactListHeader = Object.keys(
              this.contacts[0]
            ) as (keyof Contact)[];
          } else {
            this.contactListHeader = []; // or set some default headers if needed
          }

          console.log(this.contacts);
          console.log(this.contactListHeader, 'contactListHeader');
          this.errorMessage = '';
        },
        error: (error: HttpErrorResponse) => {
          // Type the error
          console.error('Error loading contacts:', error);

          if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.errorMessage = `An error occurred: ${error.error.message}`;
          } else {
            // Server-side error
            this.errorMessage = `Server returned an error: ${error.status} ${error.statusText}`;
          }
          this.contacts = []; // Clear contacts on error
          this.tempContacts = [];
        },
        // complete: () => this.loaderService.hide(),
      });
  }

  search(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.tempContacts = this.contacts.filter((item: Contact) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchVal)
      );
    });
  }


  onEdit(item: any) {
    console.log('Edit item:', item);
    // Implement edit logic
  }

  onDelete(item: any) {
    console.log('Delete item:', item);
    // Implement delete logic
  }
}
