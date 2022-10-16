import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWashingTypeFormComponent } from './add-washing-type-form.component';

describe('AddWashingTypeFormComponent', () => {
  let component: AddWashingTypeFormComponent;
  let fixture: ComponentFixture<AddWashingTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWashingTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWashingTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
