import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentInfoComponent } from './appointment-info.component';

describe('ClientAppointmentInfoComponent', () => {
  let component: ClientAppointmentInfoComponent;
  let fixture: ComponentFixture<ClientAppointmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientAppointmentInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientAppointmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
