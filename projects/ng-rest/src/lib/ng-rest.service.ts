import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transformAndValidate } from 'class-transformer-validator';
import { Observable, ReplaySubject } from 'rxjs';
import { flatMap, share, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { UrlMap } from './model/urlmap';
import { NgRestConfigService } from './ng-rest-config.service';

@Injectable()
export class NgRestService {
  readonly defaultOptions = { responseType: 'text' };

  constructor(private http: HttpClient,
      @Inject('ng-rest-config') private restConfig?: NgRestConfigService) { }

  private subjects: { [url: string]: ReplaySubject<any> } = {};

  private getData<T>(urlMap: UrlMap, force?: boolean, ids?: Map<string, string>): Observable<any> {
    return this.getActionUrl(urlMap, ids).pipe(
      flatMap(actionUrl =>  {
        if (this.subjects[actionUrl] === undefined) {
          this.subjects[actionUrl] = new ReplaySubject<any>(1);
          force = true;
        }
        if (force) {
          this.http.get(actionUrl, { headers: undefined })
            .subscribe((response: T) => {
              this.subjects[actionUrl].next(response);
            }, error => {
              this.subjects[actionUrl].error(error);
            });
        }
        return this.subjects[actionUrl];
      })
    );
  }

  // tslint:disable-next-line:max-line-length
  public getParsedObject<T extends object>(clazz: { new(...args: any[]): T }, urlMap: UrlMap, force?: boolean, ids?: Map<string, string>): Observable<T> {
    return this.getData(urlMap, force, ids).pipe(flatMap((data: Object) => from(transformAndValidate<T>(clazz, data))));
  }

  // tslint:disable-next-line:max-line-length
  public getUnparsedObject<T extends object>(urlMap: UrlMap, force?: boolean, ids?: Map<string, string>): Observable<T> {
    return this.getData<T>(urlMap, force, ids);
  }

  // tslint:disable-next-line:max-line-length
  public getParsedArray<T extends object>(clazz: { new(...args: any[]): T }, urlMap: UrlMap, force?: boolean, ids?: Map<string, string>): Observable<T[]> {
    return this.getData(urlMap, force, ids).pipe(flatMap((data: Object[]) => from(transformAndValidate<T>(clazz, data))));
  }

  // tslint:disable-next-line:max-line-length
  public getUnparsedArray<T extends object>(urlMap: UrlMap, force?: boolean, ids?: Map<string, string>): Observable<T[]> {
    return this.getData<T>(urlMap, force, ids);
  }

  public postData(urlMap: UrlMap, newData, ids?: Map<string, string>): Observable<any> {
    return this.getActionUrl(urlMap, ids).pipe(
      flatMap(actionUrl => this.http.post(actionUrl, newData, urlMap.options)),
      share()
    );
  }

  public putData(urlMap: UrlMap, newData, ids?: Map<string, string>): Observable<any> {
    return this.getActionUrl(urlMap, ids).pipe(
      flatMap(actionUrl => this.http.put(actionUrl, newData, urlMap.options)),
      share()
    );
  }

  public deleteData(urlMap: UrlMap, ids?: Map<string, string>): Observable<any> {
    return this.getActionUrl(urlMap, ids).pipe(
      flatMap(actionUrl => this.http.delete(actionUrl, urlMap.options)),
      share()
    );
  }

  private getActionUrl(urlMap: UrlMap, ids: Map<string, string>): Observable<string> {
    return this.restConfig.api_server.pipe(map(apiUrl => {
      const [actionUrl, queryString] = urlMap.url.split('?');
    let url = (!urlMap.localCall) ? actionUrl : apiUrl + actionUrl;
    // url = this.applyQueryParams(url, queryString);

    // FIXME: Use Optional Chaining with TS 3.7
    if (ids) {
      ids.forEach((value, key) => url = url.replace('{' + key + '}', value));
    }

    return url;
    /*return url.replace('{fin}', this.parameterStore.lastParams.fin)
      .replace('{finOrVin}', this.parameterStore.lastParams.fin);*/
    }));
  }

  /*private getOptions(options: any ): any {
    return {...this.defaultOptions, ...options };
  }*/

  /*private applyQueryParams(url: string, queryString: string) {
    const urlWithQuery = url + '?' + this.parameterStore.lastParams.getQueryString();
    return (queryString) ? urlWithQuery + '&' + queryString : urlWithQuery;
  }*/
}
