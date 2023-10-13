import { Observable } from 'rxjs';
import { CloudProviderModel } from '../models/cloudProvider.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';

export abstract class CloudProviderRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<IndexEntity<CloudProviderModel>>;
    abstract find(params: {id: number}): Observable<CloudProviderModel>;
}
