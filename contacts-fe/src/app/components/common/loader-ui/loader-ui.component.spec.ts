import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderUiComponent } from './loader-ui.component';

describe('LoaderUiComponent', () => {
  let component: LoaderUiComponent;
  let fixture: ComponentFixture<LoaderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
