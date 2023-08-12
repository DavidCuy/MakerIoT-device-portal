import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceEntity } from './entities/device-entity';
import { DeviceImplementationRepositoryMapper } from './mappers/device-repository.mapper';
import { DeviceRepository } from 'src/domain/repositories/device.repository';
import { DeviceModel } from 'src/domain/models/device.model';
@Injectable({
    providedIn: 'root',
})
export class DeviceImplementationRepository extends DeviceRepository {
    deviceMapper = new DeviceImplementationRepositoryMapper();
    constructor(private http: HttpClient) {
        super();
    }
    index(params: {
      page?: number,
      perPage?: number,
      filterByColum?: Map<string, string>,
      searchByColumn?: Map<string, string>
    } = {
      page: 1,
      perPage: 10
    }): Observable<DeviceModel> {
        return this.http
            .post<DeviceEntity>('https://example.com/login', {params})
            .pipe(map(this.deviceMapper.mapFrom));
    }
    store(params: {idDeviceType: number, name: string, serial: string}): Observable<DeviceModel> {
       return this.http
            .post<DeviceEntity>('https://example.com/register', {params})
            .pipe(map(this.deviceMapper.mapFrom));
    }
    find(params: {id: number}): Observable<DeviceModel>{
        return this.http.get<DeviceEntity>('https://example.com/user', {params}).pipe(
            map(this.deviceMapper.mapFrom));
    }
}
