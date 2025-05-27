import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  show() {
    this.loading.next(true);
    console.log('LoaderService: show() called');
  }
  hide() {
    console.log('LoaderService: hide() called');
    this.loading.next(false);
  }
}
