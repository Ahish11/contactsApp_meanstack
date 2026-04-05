import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LoaderService } from "../../shared/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.loaderService.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          // The token is now handled via HTTP-only cookie
          this.authService.setLoggedIn(true);
          this.loaderService.hide(); // Hide before navigating
          // Redirect to home or contacts list
          this.router.navigate(["/home"]);
        },
        error: err => {
          this.loaderService.hide(); // Hide on error
          this.errorMessage = err.error?.message || "Login failed. Please check your credentials.";
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
