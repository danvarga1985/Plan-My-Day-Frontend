import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsService = TestBed.inject(SettingsService);
    expect(service).toBeTruthy();
  });
});
