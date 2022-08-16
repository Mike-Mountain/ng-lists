import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplayCardComponent } from './list-display-card.component';

describe('ListDisplayCardComponent', () => {
  let component: ListDisplayCardComponent;
  let fixture: ComponentFixture<ListDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListDisplayCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
