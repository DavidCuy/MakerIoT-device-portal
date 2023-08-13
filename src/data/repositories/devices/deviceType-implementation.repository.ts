import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DeviceTypeEntity } from './entities/deviceType-entity';
import { DeviceTypeImplementationRepositoryMapper } from './mappers/deviceType-repository.mapper';
import { DeviceTypeRepository } from 'src/domain/repositories/deviceType.repository';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { API_BASE_URL } from 'src/environments/environment';
import { IndexEntity } from './entities/index-entity';
import { get_column_filters_params } from './mappers/utilities';

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
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {
        page: 1,
        perPage: 10,
        filterByColum: [],
        searchByColumn: [],
        relationships: []
    }): Observable<IndexEntity<DeviceTypeModel>> {
        let sendParams: HttpParams = get_column_filters_params(params)
        return this.http
            .get<IndexEntity<DeviceTypeModel>>(`${API_BASE_URL}/device-type`, { params: sendParams })
            .pipe(map(this.deviceTypeMapper.mapMultipleFrom));
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
