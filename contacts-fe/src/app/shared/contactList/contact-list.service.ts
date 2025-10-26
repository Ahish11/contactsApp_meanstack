import { addons } from "@storybook/manager-api";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, Observer, of } from "rxjs";
import { Contact } from "./../../interface/contactList";
import { environment } from "../../../../enviroments/environment";
@Injectable({
  providedIn: "root",
})
export class ContactListService {
  // constructor( private http :HttpClient ) {

  // }
  // getContactList():Observable<any[]>{
  //   return this.http.get<any[]>(`${this.apiURL}/contacts`);
  // }

  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL;

  // getContactList(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(`${this.apiURL}/contacts`);
  //   // .pipe(catchError(this.handleError<Contact[]>('getContactList', [])));
  // }
  getContactList(): Observable<Contact[]> {
    console.log("API CALLING:", `${this.apiURL}/contacts`);
    return this.http.get<Contact[]>(`${this.apiURL}/contacts`);
  }
  getContactsbyId(id: string): Promise<any> {
    return lastValueFrom(this.http.get<Contact>(`${this.apiURL}/contacts/${id}`));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
  createContact(contact: Contact): Observable<Contact[]> {
    return this.http.post<any>(`${this.apiURL}/contacts`, contact);
    // return this.http.post<any>(`${this.apiURL}/contacts`, contact, {
    //   headers: { 'Content-Type': 'application/json' }
    // });
  }
  deleteContact(id: string): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.apiURL}/contacts/${id}`));
  }
  updateContact(id: string, contact: Contact) {
    debugger;
    return lastValueFrom(this.http.put<any>(`${this.apiURL}/contacts/${id}`, contact));
  }
}
