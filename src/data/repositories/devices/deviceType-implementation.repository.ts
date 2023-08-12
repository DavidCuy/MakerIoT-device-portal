import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceTypeEntity } from './entities/deviceType-entity';
import { DeviceTypeImplementationRepositoryMapper } from './mappers/deviceType-repository.mapper';
import { DeviceTypeRepository } from 'src/domain/repositories/deviceType.repository';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
@Injectable({
    providedIn: 'root',
})
export class DeviceTypeImplementationRepository extends DeviceTypeRepository {
    deviceTypeMapper = new DeviceTypeImplementationRepositoryMapper();
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
    }): Observable<DeviceTypeModel> {
        return this.http
            .post<DeviceTypeEntity>('https://example.com/login', {params})
            .pipe(map(this.deviceTypeMapper.mapFrom));
    }
    store(params: {name: string}): Observable<DeviceTypeModel> {
       return this.http
            .post<DeviceTypeEntity>('https://example.com/register', {params})
            .pipe(map(this.deviceTypeMapper.mapFrom));
    }
    find(params: {id: number}): Observable<DeviceTypeModel>{
        return this.http.get<DeviceTypeEntity>('https://example.com/user', {params}).pipe(
            map(this.deviceTypeMapper.mapFrom));
    }
}
