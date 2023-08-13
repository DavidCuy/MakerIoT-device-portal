import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService extends BaseService {

  public override path: string = 'device-type'

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }
}
