import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingTypesComponent } from './washing-types.component';

describe('WashingTypesComponent', () => {
  let component: WashingTypesComponent;
  let fixture: ComponentFixture<WashingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashingTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
