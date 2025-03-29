import { Contact } from './../../interface/contactList';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ContactListService } from '../../shared/contactList/contact-list.service';
import { catchError, Observable, of } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private http: HttpClient) {}
  private contactService = inject(ContactListService); // Inject service using inject()
  searchText = '';
  contacts: Contact[] = [];
  tempContacts: Contact[] = [];
  contactListHeader: (keyof Contact)[] = [];
  // contactListHeader: string[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    console.log('in');
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContactList().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.tempContacts = contacts;
        this.contactListHeader = Object.keys(
          this.contacts[0]
        ) as (keyof Contact)[];
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
    });
  }
  onContactClick(contact: Contact) {
    console.log('Contact clicked:', contact);
  }

  search(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.tempContacts = this.contacts.filter((item: Contact) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchVal)
      );
    });
  }

  // search(event: Event) {
  //   debugger;
  //   const searchVal = (event.target as HTMLInputElement).value.toLowerCase();
  //   this.tempContacts = this.contacts.filter((item: any) => {
  //     for (const key in item) {
  //       if (typeof item[key] === 'string' || typeof item[key] === 'number') {
  //         if (String(item[key]).toLowerCase().includes(searchVal)) {
  //           return true; // Match found, keep this item.
  //         }
  //       }
  //     }
  //     return false; // No match found in any property, filter this item out.
  //   });
  // }
}
