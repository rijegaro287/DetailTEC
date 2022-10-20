import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddAppointmentFormComponent } from './client-add-appointment-form.component';

describe('ClientAddAppointmentFormComponent', () => {
  let component: ClientAddAppointmentFormComponent;
  let fixture: ComponentFixture<ClientAddAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAddAppointmentFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientAddAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
