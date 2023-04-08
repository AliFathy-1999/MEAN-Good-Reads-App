import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorHeaderComponent } from './author-header.component';

describe('AuthorHeaderComponent', () => {
  let component: AuthorHeaderComponent;
  let fixture: ComponentFixture<AuthorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
