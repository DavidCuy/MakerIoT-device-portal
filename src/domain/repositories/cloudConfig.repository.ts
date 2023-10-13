import { Observable } from 'rxjs';
import { CloudConfigModel } from '../models/cloudConfig.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';

export abstract class CloudConfigRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<IndexEntity<CloudConfigModel>>;
    abstract store(params: {id_cloud_provider: number, profile: string, enabled: boolean}): Observable<CloudConfigModel>;
    abstract find(params: {id: number}): Observable<CloudConfigModel>;
    abstract delete(params: {id: number}): Observable<null>;
}
