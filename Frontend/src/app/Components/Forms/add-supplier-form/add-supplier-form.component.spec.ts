import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierFormComponent } from './add-supplier-form.component';

describe('AddSupplierFormComponent', () => {
  let component: AddSupplierFormComponent;
  let fixture: ComponentFixture<AddSupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplierFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
