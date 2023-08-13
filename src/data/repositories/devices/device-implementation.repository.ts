import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DeviceEntity } from './entities/device-entity';
import { DeviceImplementationRepositoryMapper } from './mappers/device-repository.mapper';
import { DeviceRepository } from 'src/domain/repositories/device.repository';
import { DeviceModel } from 'src/domain/models/device.model';
import { API_BASE_URL } from 'src/environments/environment';
import { IndexEntity } from './entities/index-entity';
import { get_column_filters_params, get_post_headers } from './mappers/utilities';

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
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {
      page: 1,
      perPage: 10,
      filterByColum: [],
      searchByColumn: [],
      relationships: []
    }): Observable<DeviceModel[]> {
        let sendParams: HttpParams = get_column_filters_params(params)
        return this.http
            .get<IndexEntity>(`${API_BASE_URL}/device`, { params: sendParams })
            .pipe(map(this.deviceMapper.mapMultipleFrom));
    }
    store(params: {id_device_type: number, name: string, serial: string}): Observable<DeviceModel> {
        return this.http
            .post<DeviceEntity>(`${API_BASE_URL}/device/`, params, { headers: get_post_headers() })
            .pipe(map(this.deviceMapper.mapFrom));
    }
    find(params: {id: number}): Observable<DeviceModel>{
        return this.http.get<DeviceEntity>('https://example.com/user', {params}).pipe(
            map(this.deviceMapper.mapFrom));
    }
}
