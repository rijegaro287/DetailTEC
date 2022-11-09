import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivaluedSelectComponent } from './multivalued-select.component';

describe('MultivaluedSelectComponent', () => {
  let component: MultivaluedSelectComponent;
  let fixture: ComponentFixture<MultivaluedSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultivaluedSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultivaluedSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
