import { Observable } from 'rxjs';
import { DeviceTypeModel } from '../models/deviceType.model';
export abstract class DeviceTypeRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<DeviceTypeModel[]>;
    abstract store(params: {name: string}): Observable<DeviceTypeModel>;
    abstract find(params: {id: number}): Observable<DeviceTypeModel>;
}
