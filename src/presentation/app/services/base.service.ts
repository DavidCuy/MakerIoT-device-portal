import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class BaseService
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public METHOD_GET: string = 'GET';
  public METHOD_POST: string = 'POST';
  public METHOD_PUT: string = 'PUT';
  public METHOD_DELETE: string = 'DELETE';

  public BASE_PATH: string = `http://${env.hostIP}:${env.apiPort}`

  public path: string = ''
  public pageParams: HttpParams = new HttpParams({fromObject: {page: 1, per_page:10}})

  constructor(protected _httpClient: HttpClient) { }

  public get(qparams: {name: string, value: string | number | boolean}[] = []): Observable<any> {
    let sendParams = this.pageParams
    for (let valuePair of qparams) {
      sendParams = sendParams.append(valuePair.name, valuePair.value)
    }
    return this._httpClient.get(`${this.BASE_PATH}/dev/${this.path}`, { params: sendParams })
      .pipe(map( (resolve, reject) => {
        return resolve;
    }));
  }

  public create(body: {} = {}): Observable<any> {
    return this._httpClient.post(`${this.BASE_PATH}/dev/${this.path}/`, body, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })})
      .pipe(map( (resolve, reject) => {
        return resolve;
    }));
  }
}
