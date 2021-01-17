import { TestBed } from '@angular/core/testing';

import { EntryService } from './entry.service';

describe('EntryDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryService = TestBed.inject(EntryService);
    expect(service).toBeTruthy();
  });
});
