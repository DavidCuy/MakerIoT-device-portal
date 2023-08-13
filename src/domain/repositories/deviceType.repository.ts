import { Observable } from 'rxjs';
import { DeviceTypeModel } from '../models/deviceType.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
export abstract class DeviceTypeRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<IndexEntity<DeviceTypeModel>>;
    abstract store(params: {name: string}): Observable<DeviceTypeModel>;
    abstract find(params: {id: number}): Observable<DeviceTypeModel>;
}
