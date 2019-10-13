import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NgRestConfigService {

  private _api_server: ReplaySubject<string> = new ReplaySubject<string>();
  private _default_params = new ReplaySubject<Map<string, string>>();

  constructor() { }

  public with_api_server(url: string): NgRestConfigService {
    this._api_server.next(url);
    return this;
  }

  public get api_server(): Observable<string> {
    return this._api_server;
  }

  public with_default_params(params: Map<string, string>) {
    this._default_params.next(params);
    return this;
  }

  public get default_params() {
    return this._default_params;
  }
}
