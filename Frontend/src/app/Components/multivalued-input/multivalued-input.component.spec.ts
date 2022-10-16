import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivaluedInputComponent } from './multivalued-input.component';

describe('MultivaluedInputComponent', () => {
  let component: MultivaluedInputComponent;
  let fixture: ComponentFixture<MultivaluedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultivaluedInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultivaluedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
