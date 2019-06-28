import { TestBed } from '@angular/core/testing';

import { WorkmanshipPriceResolverService } from './workmanship-price-resolver.service';

describe('WorkmanshipPriceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkmanshipPriceResolverService = TestBed.get(WorkmanshipPriceResolverService);
    expect(service).toBeTruthy();
  });
});
