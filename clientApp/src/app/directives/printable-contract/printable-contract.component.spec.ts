import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintableContractComponent } from './printable-contract.component';

describe('PrintableContractComponent', () => {
  let component: PrintableContractComponent;
  let fixture: ComponentFixture<PrintableContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintableContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintableContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
