import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CloudProviderEntity } from './entities/cloudProvider-entity';
import { CloudProviderRepositoryMapper } from './mappers/cloud-provider-repository.mapper';
import { CloudProviderRepository } from 'src/domain/repositories/cloudProvider.repository';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { API_BASE_URL } from 'src/environments/environment';
import { IndexEntity } from '../index/entitites/index-entity';
import { get_column_filters_params } from './mappers/utilities';

@Injectable({
    providedIn: 'root',
})
export class CloudProviderImplementationRepository extends CloudProviderRepository {
    cloudProviderMapper = new CloudProviderRepositoryMapper();
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
    }): Observable<IndexEntity<CloudProviderModel>> {
        let sendParams: HttpParams = get_column_filters_params(params)
        return this.http
            .get<IndexEntity<CloudProviderModel>>(`${API_BASE_URL}/cloud-provider`, { params: sendParams })
            .pipe(map(this.cloudProviderMapper.mapMultipleFrom));
    }
    find(params: {id: number}): Observable<CloudProviderModel>{
        return this.http.get<CloudProviderEntity>(`${API_BASE_URL}/cloud-provider`, {params}).pipe(
            map(this.cloudProviderMapper.mapFrom));
    }
}
