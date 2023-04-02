import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsPopupComponent } from './authors-popup.component';

describe('AuthorsPopupComponent', () => {
  let component: AuthorsPopupComponent;
  let fixture: ComponentFixture<AuthorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
