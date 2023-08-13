import { Observable } from 'rxjs';
import { DeviceModel } from '../models/device.model';
import { IndexEntity } from 'src/data/repositories/index-entity';
export abstract class DeviceRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<IndexEntity<DeviceModel>>;
    abstract store(params: {id_device_type: number, name: string, serial: string}): Observable<DeviceModel>;
    abstract find(params: {id: number}): Observable<DeviceModel>;
}
