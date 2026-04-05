import { Contact } from "./../../interface/contactList";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { ContactListService } from "../../shared/contactList/contact-list.service";
import { catchError, finalize, Observable, of } from "rxjs";
import {
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableComponent } from "../datatable/datatable.component";
import { LoaderService } from "../../shared/loader/loader.service";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { HeaderComponent } from "../header/header.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [
    FormsModule,
    DatatableComponent,
    ReactiveFormsModule,
    SideNavComponent,
    HeaderComponent,
  ],
  templateUrl: "./contact-list.component.html",
  styleUrl: "./contact-list.component.scss",
})
export class ContactListComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  constructor(private http: HttpClient, private loaderService: LoaderService) {}
  private contactService = inject(ContactListService);

  searchText = "";
  contacts: Contact[] = [];
  tempContacts: Contact[] = [];
  contactListHeader: (keyof Contact)[] = [];
  errorMessage: string = "";
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.contactService
      .getContactList()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
          this.tempContacts = contacts;
          if (this.contacts && this.contacts.length > 0) {
            this.contactListHeader = Object.keys(this.contacts[0]) as (keyof Contact)[];
          } else {
            this.contactListHeader = [];
          }
          this.errorMessage = "";
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error loading contacts:", error);
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `An error occurred: ${error.error.message}`;
          } else {
            this.errorMessage = `Server returned an error: ${error.status} ${error.statusText}`;
          }
          this.contacts = [];
          this.tempContacts = [];
        },
      });
  }

  async removeContact(id: string) {
    await this.contactService.deleteContact(id);
    this.loadContacts();
  }

  onEdit(item: any) {
    this.router.navigate(["/add-contact"], { state: { contact: item, isEdit: true } });
  }
}
