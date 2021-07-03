import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedBooksComponent } from './owned-books.component';

describe('OwnedBooksComponent', () => {
  let component: OwnedBooksComponent;
  let fixture: ComponentFixture<OwnedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
