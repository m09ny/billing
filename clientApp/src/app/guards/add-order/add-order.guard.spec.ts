import { TestBed, async, inject } from '@angular/core/testing';

import { AddOrderGuard } from './add-order.guard';

describe('AddOrderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddOrderGuard]
    });
  });

  it('should ...', inject([AddOrderGuard], (guard: AddOrderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
