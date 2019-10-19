import { HttpClient } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { NgRestService } from '../lib/ng-rest.service';
import { NgRestConfigService } from '../lib/ng-rest-config.service';
import { of } from 'rxjs';
import { MockHttpClient } from './mock-http-client';

describe('NgRestService', () => {
  const config = new NgRestConfigService();
  const default_params: Map<string, string> = new Map<string, string>();
    default_params
      .set('test1', 'val1')
      .set('test2', 'val2');

  config
    .with_api_server('http://www.example.com/api')
    .with_default_params(default_params);

  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          NgRestService,
          { provide: 'ng-rest-config', useValue: config },
          { provide: HttpClient, useClass: MockHttpClient }
        ]
    });
    http = TestBed.get(HttpClient);
});

  it('should test delete', async(inject([NgRestService], (service: NgRestService) => {
    const spyDelete = spyOn(http, 'delete').and.returnValue(of(''));
    service.deleteData({url: 'user'}).subscribe(() => {
      expect(spyDelete).toHaveBeenCalledTimes(1);
      expect(spyDelete).toHaveBeenCalledWith(
        'user',
        undefined
        );
    });
  })));
});
