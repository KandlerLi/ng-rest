import { TestBed } from '@angular/core/testing';

import { NgRestService } from './ng-rest.service';

describe('NgRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgRestService = TestBed.get(NgRestService);
    expect(service).toBeTruthy();
  });
});
