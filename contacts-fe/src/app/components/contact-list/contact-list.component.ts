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

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [FormsModule, DatatableComponent, ReactiveFormsModule],
  templateUrl: "./contact-list.component.html",
  styleUrl: "./contact-list.component.scss",
})
export class ContactListComponent {
  // constructor(http: HttpClient) {
  // }
  // or
  // customerList: Observable<any[]> = new Observable<any[]>();
  // customerListServices = inject(ContactListService); //in ang 18

  private fb = inject(FormBuilder);
  constructor(private http: HttpClient, private loaderService: LoaderService) {}
  private contactService = inject(ContactListService); // Inject service using inject()
  AddContactForm!: FormGroup;
  searchText = "";
  contacts: Contact[] = [];
  tempContacts: Contact[] = [];
  contactListHeader: (keyof Contact)[] = [];
  errorMessage: string = "";

  ngOnInit(): void {
    // this.debugAPICall();
    this.AddContactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
    });
    this.loadContacts();
  }
   

  search(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value.toLowerCase();
    this.tempContacts = this.contacts.filter((item: Contact) => {
      return Object.values(item).some(value => String(value).toLowerCase().includes(searchVal));
    });
  }
  selectedContactId: string = "";

  async onEdit(item: any) {
    console.log("Edit:", item);
    this.selectedContactId = item._id;
    this.AddContactForm.patchValue({
      name: item.name,
      email: item.email,
      phone: item.phone,
    });
  }
  async updateContact() {
    const updatedData: Contact = this.AddContactForm.value;
    try {
      await this.contactService.updateContact(this.selectedContactId, updatedData);
      await this.loadContacts();
      this.AddContactForm.reset();
      this.selectedContactId = "";
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  async removeContact(id: string) {
    await this.contactService.deleteContact(id);
    this.loadContacts();
  }

  addRecord(): void {
    console.log(this.AddContactForm.value, "this.AddContactForm.value");
    // Check if the form is valid before submitting
    if (this.AddContactForm.invalid) {
      alert("Name is a required field.");
      return;
    }

    // Use the form's value to create the new record
    this.contactService.createContact(this.AddContactForm.value).subscribe(() => {
      this.loadContacts();
      this.AddContactForm.reset();
    });
  }
}
