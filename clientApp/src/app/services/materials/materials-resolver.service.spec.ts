import { TestBed } from '@angular/core/testing';

import { MaterialsResolverService } from './materials-resolver.service';

describe('MaterialsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialsResolverService = TestBed.get(MaterialsResolverService);
    expect(service).toBeTruthy();
  });
});
