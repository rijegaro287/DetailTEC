import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchesComponent } from './branches.component';

describe('BranchesComponent', () => {
  let component: AdminBranchesComponent;
  let fixture: ComponentFixture<AdminBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBranchesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
