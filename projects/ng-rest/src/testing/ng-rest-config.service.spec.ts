import { TestBed, inject } from '@angular/core/testing';

import { NgRestConfigService } from '../lib/ng-rest-config.service';

describe('NgRestConfigService', () => {
  TestBed.configureTestingModule({
    providers: [
      NgRestConfigService
    ]
});

  it('should be created', inject([NgRestConfigService], (service: NgRestConfigService) => {
    expect(service).toBeTruthy();
  }));


  it('should save api server', inject([NgRestConfigService], (service: NgRestConfigService) => {
    const api_server = 'http://www.example.com/api';

    service
      .with_api_server(api_server)
      .api_server
      .subscribe(url => expect(url).toBe(api_server));
  }));

  it('should save default params', inject([NgRestConfigService], (service: NgRestConfigService) => {
    const default_params: Map<string, string> = new Map<string, string>();
    default_params
      .set('test1', 'val1')
      .set('test2', 'val2');

    service
      .with_default_params(default_params)
      .default_params
      .subscribe(url => expect(url).toBe(default_params));
  }));
});
