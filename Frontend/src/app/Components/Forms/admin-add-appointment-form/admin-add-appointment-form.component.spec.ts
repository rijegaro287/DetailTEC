import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAppointmentFormComponent } from './admin-add-appointment-form.component';

describe('AdminAddAppointmentFormComponent', () => {
  let component: AdminAddAppointmentFormComponent;
  let fixture: ComponentFixture<AdminAddAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAppointmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
