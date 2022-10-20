import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingTypeInfoComponent } from './washing-type-info.component';

describe('WashingTypeInfoComponent', () => {
  let component: WashingTypeInfoComponent;
  let fixture: ComponentFixture<WashingTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashingTypeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashingTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
