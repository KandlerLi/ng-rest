import { HttpClient } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { NgRestService } from '../lib/ng-rest.service';
import { NgRestConfigService } from '../lib/ng-rest-config.service';
import { of } from 'rxjs';
import { MockHttpClient } from './mock-http-client';
import { TestObject } from './test-object';

const testObjectString = '{"id": "1", "age":23, "name":{"firstName":"Julian", "lastName":"Kandler"}}';

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

  it('should test get', async(inject([NgRestService], (service: NgRestService) => {
    const spyGet = spyOn(http, 'get').and.returnValue(of(testObjectString));
    service.getParsedObject(TestObject, {url: 'user/1'}).subscribe(() => {
      expect(spyGet).toHaveBeenCalledTimes(1);
      expect(spyGet).toHaveBeenCalledWith(
        'user/1',
        {'headers': undefined}
        );
    });
  })));

  /*it('should cache get requests', async(inject([NgRestService], (service: NgRestService) => {
    const spyGet = spyOn(http, 'get').and.returnValue(of(testObjectString));
    service.getParsedObject(TestObject, {url: 'user/1'}).subscribe(() => {
      expect(spyGet).toHaveBeenCalledTimes(1);
      spyGet.calls.reset();
      service.getParsedObject(TestObject, {url: 'user/1'}).subscribe(() => {
        expect(spyGet).toHaveBeenCalledTimes(0);
        spyGet.calls.reset();
        service.getParsedObject(TestObject, {url: 'user/2'}).subscribe(() => {
          expect(spyGet).toHaveBeenCalledTimes(1);
          spyGet.calls.reset();
          service.getParsedObject(TestObject, {url: 'user/1'}, true).subscribe(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  })));*/

});
