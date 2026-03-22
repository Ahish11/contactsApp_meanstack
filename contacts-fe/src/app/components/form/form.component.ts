import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ContactListService } from '../../shared/contactList/contact-list.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  AddContactForm!: FormGroup;
  isEditMode: boolean = false;
  contactId: string | null = null;
  private fb = inject(FormBuilder);
  private contactService = inject(ContactListService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  private location = inject(Location);

  ngOnInit(): void {
    this.AddContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: [''],
      jobTitle: [''],
      notes: ['']
    });

    const state = history.state;
    if (state && state.isEdit && state.contact) {
      this.isEditMode = true;
      this.contactId = state.contact._id;
      this.AddContactForm.patchValue({
        name: state.contact.name || '',
        email: state.contact.email || '',
        phone: state.contact.phone || '',
        company: state.contact.company || '',
        jobTitle: state.contact.jobTitle || '',
        notes: state.contact.notes || ''
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addRecord(): void {
    if (this.AddContactForm.invalid) {
      alert("Please fill required fields.");
      return;
    }
    
    try {
      this.loaderService.show();
    } catch(e) {}

    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, this.AddContactForm.value)
        .then(() => {
          try { this.loaderService.hide(); } catch(e) {}
          this.router.navigate(['/home']);
        })
        .catch((err: any) => {
          try { this.loaderService.hide(); } catch(e) {}
          console.error("Failed to update contact", err);
        });
    } else {
      this.contactService.createContact(this.AddContactForm.value).subscribe({
        next: () => {
          try { this.loaderService.hide(); } catch(e) {}
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          try { this.loaderService.hide(); } catch(e) {}
          console.error("Failed to create contact", err);
        }
      });
    }
  }
}
