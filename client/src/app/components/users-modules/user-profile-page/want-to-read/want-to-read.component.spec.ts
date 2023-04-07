import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToReadComponent } from './want-to-read.component';

describe('WantToReadComponent', () => {
  let component: WantToReadComponent;
  let fixture: ComponentFixture<WantToReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantToReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WantToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
