import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loader-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-ui.component.html',
  styleUrl: './loader-ui.component.scss',
})
export class LoaderUiComponent {
  // isLoading$: Observable<boolean> = of(false);
  isLoading$: Observable<boolean>;
  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loaderService.isLoading$;
    // if (this.isLoading$) {
    //   this.isLoading$ = of(true);
    // } else {
    //   this.isLoading$ = of(false);
    //   console.log('hideee');
    // }
    this.isLoading$.subscribe(() => this.cdRef.markForCheck());
    console.log('isLoading$', this.isLoading$);
  }
}
