import { TestBed } from '@angular/core/testing';

import { DateFunctionsService } from './date-functions.service';

describe('DateFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateFunctionsService = TestBed.inject(DateFunctionsService);
    expect(service).toBeTruthy();
  });
});
