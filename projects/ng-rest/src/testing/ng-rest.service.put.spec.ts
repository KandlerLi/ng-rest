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

  it('should test put', async(inject([NgRestService], (service: NgRestService) => {
    const spyPut = spyOn(http, 'put').and.returnValue(of(''));
    service.putData({url: 'user'}, {username: 'pete'}).subscribe(() => {
      expect(spyPut).toHaveBeenCalledTimes(1);
      expect(spyPut).toHaveBeenCalledWith(
        'user',
        {'username': 'pete'},
        undefined
        );
    });
  })));

});
