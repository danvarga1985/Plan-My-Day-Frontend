import { TestBed } from '@angular/core/testing';

import { UserPreferencesHttpService } from './user-preferences-http.service';

describe('UserPreferencesHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPreferencesHttpService = TestBed.inject(UserPreferencesHttpService);
    expect(service).toBeTruthy();
  });
});
