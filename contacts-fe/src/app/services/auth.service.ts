import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import Cookies from "js-cookie";
import { environment } from "../../../enviroments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURL}/users`;

  constructor() {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true });
  }

  // Helper to save "logged in" state if needed
  setLoggedIn(loggedIn: boolean) {
    if (loggedIn) {
      Cookies.set("isLoggedIn", "true", { expires: 1 });
    } else {
      Cookies.remove("isLoggedIn");
    }
  }

  isLoggedIn(): boolean {
    return Cookies.get("isLoggedIn") === "true";
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.setLoggedIn(false);
      },
      error: () => {
        this.setLoggedIn(false); // Still clear local state
      },
    });
  }
}
