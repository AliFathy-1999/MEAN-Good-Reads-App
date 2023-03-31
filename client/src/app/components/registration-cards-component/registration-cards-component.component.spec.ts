import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCardsComponentComponent } from './registration-cards-component.component';

describe('RegistrationCardsComponentComponent', () => {
  let component: RegistrationCardsComponentComponent;
  let fixture: ComponentFixture<RegistrationCardsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationCardsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationCardsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
