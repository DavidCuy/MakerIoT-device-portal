import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CloudConfigEntity } from './entities/cloudConfig-entity';
import { CloudConfigRepositoryMapper } from './mappers/cloud-config-repository.mapper';
import { CloudConfigRepository } from 'src/domain/repositories/cloudConfig.repository';
import { CloudConfigModel } from 'src/domain/models/cloudConfig.model';
import { API_BASE_URL } from 'src/environments/environment';
import { IndexEntity } from '../index/entitites/index-entity';
import { get_column_filters_params, get_post_headers } from './mappers/utilities';

@Injectable({
    providedIn: 'root',
})
export class CloudConfigImplementationRepository extends CloudConfigRepository {
    cloudConfigMapper = new CloudConfigRepositoryMapper();
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
    }): Observable<IndexEntity<CloudConfigEntity>> {
        let sendParams: HttpParams = get_column_filters_params(params)
        return this.http
            .get<IndexEntity<CloudConfigEntity>>(`${API_BASE_URL}/cloud-config`, { params: sendParams })
            .pipe(map(this.cloudConfigMapper.mapMultipleFrom));
    }
    store(params: {id_cloud_provider: number, profile: string, enabled: boolean}): Observable<CloudConfigModel> {
        return this.http
            .post<CloudConfigEntity>(`${API_BASE_URL}/cloud-config/`, params, { headers: get_post_headers() })
            .pipe(map(this.cloudConfigMapper.mapFrom));
    }
    find(params: {id: number}): Observable<CloudConfigModel>{
        return this.http.get<CloudConfigEntity>(`${API_BASE_URL}/cloud-config/`, {params}).pipe(
            map(this.cloudConfigMapper.mapFrom));
    }
    delete(params: {id: number}): Observable<null>{
        return this.http.delete<null>(`${API_BASE_URL}/cloud-config/${params.id}`);
    }
}
