import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService {

  public override path: string = 'device'

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }
}
