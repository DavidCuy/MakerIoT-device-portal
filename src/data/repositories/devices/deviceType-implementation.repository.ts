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
        searchByColumn?: {name: string, value: string | number | boolean}[]
    } = {
        page: 1,
        perPage: 10,
        filterByColum: [],
        searchByColumn: []
    }): Observable<DeviceTypeModel[]> {
        let sendParams: HttpParams = new HttpParams({fromObject: {
            page: params.page ? params.page : 1,
            perPage: params.perPage ? params.perPage : 10
          }})
        for (let valuePair of params.filterByColum ? params.filterByColum : []) {
          sendParams.append(valuePair.name, valuePair.value)
        }
        for (let valuePair of params.searchByColumn ? params.searchByColumn : []) {
            sendParams.append(valuePair.name, valuePair.value)
          }
        return this.http
            .get<IndexEntity>(`${API_BASE_URL}/device-type`, { params: sendParams })
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
