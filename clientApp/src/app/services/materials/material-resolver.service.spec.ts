import { TestBed } from '@angular/core/testing';

import { MaterialResolverService } from './material-resolver.service';

describe('MaterialResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialResolverService = TestBed.get(MaterialResolverService);
    expect(service).toBeTruthy();
  });
});
