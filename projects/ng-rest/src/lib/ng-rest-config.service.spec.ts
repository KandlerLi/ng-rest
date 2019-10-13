import { TestBed } from '@angular/core/testing';

import { NgRestConfigService } from './ng-rest-config.service';

describe('NgRestConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgRestConfigService = TestBed.get(NgRestConfigService);
    expect(service).toBeTruthy();
  });
});
