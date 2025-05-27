import { addons } from '@storybook/manager-api';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Contact } from './../../interface/contactList';
import { environment } from '../../../../enviroments/environment';
@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  // constructor( private http :HttpClient ) {

  // }
  // getContactList():Observable<any[]>{
  //   return this.http.get<any[]>(`${this.apiURL}/contacts`);
  // }

  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL;

  getContactList(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(`${this.apiURL}/contacts`)
      // .pipe(catchError(this.handleError<Contact[]>('getContactList', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
