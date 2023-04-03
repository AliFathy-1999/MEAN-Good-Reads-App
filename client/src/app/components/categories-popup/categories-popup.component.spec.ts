import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPopupComponent } from './categories-popup.component';

describe('CategoriesPopupComponent', () => {
  let component: CategoriesPopupComponent;
  let fixture: ComponentFixture<CategoriesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
