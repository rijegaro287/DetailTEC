import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesComponent } from './employees.component';

describe('EmployeesComponent', () => {
  let component: AdminEmployeesComponent;
  let fixture: ComponentFixture<AdminEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEmployeesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
