import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmanshipPricesComponent } from './workmanship-prices.component';

describe('WorkmanshipPricesComponent', () => {
  let component: WorkmanshipPricesComponent;
  let fixture: ComponentFixture<WorkmanshipPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkmanshipPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkmanshipPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
