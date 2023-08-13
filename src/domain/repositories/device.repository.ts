import { Observable } from 'rxjs';
import { DeviceModel } from '../models/device.model';
export abstract class DeviceRepository {
    abstract index(params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }): Observable<DeviceModel[]>;
    abstract store(params: {idDeviceType: number, name: string, serial: string}): Observable<DeviceModel>;
    abstract find(params: {id: number}): Observable<DeviceModel>;
}
