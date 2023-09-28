import { Observable } from 'rxjs';
import { DeviceConfigModel } from '../models/deviceConfig.model';
export abstract class DeviceConfigRepository {
    abstract list_by_device_id(params: {
        device_id: number
    }): Observable<Array<DeviceConfigModel>>;
    abstract store(params: {device_id: number, name: string}): Observable<DeviceConfigModel>;
    abstract update(params: {
        _id: string,
        name: string,
        device_id: number,
        input_topic: string,
        input_json: any,
        output_json: any,
        output_topic: string,
        updated_at: string
    }): Observable<DeviceConfigModel>;
    abstract delete(params: {_id: string, device_id: number}): Observable<null>;
}
