import { TestBed } from '@angular/core/testing';

import { EmptyEntryDetailsService } from './empty-entry-details.service';

describe('EmptyEntryDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmptyEntryDetailsService = TestBed.inject(EmptyEntryDetailsService);
    expect(service).toBeTruthy();
  });
});
