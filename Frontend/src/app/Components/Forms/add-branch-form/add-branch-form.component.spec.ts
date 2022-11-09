import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchFormComponent } from './add-branch-form.component';

describe('AddBranchFormComponent', () => {
  let component: AddBranchFormComponent;
  let fixture: ComponentFixture<AddBranchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBranchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
