import { TestBed } from '@angular/core/testing';

import { WorkmanshipService } from './workmanship.service';

describe('WorkmanshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkmanshipService = TestBed.get(WorkmanshipService);
    expect(service).toBeTruthy();
  });
});
