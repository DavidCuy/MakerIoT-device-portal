import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceConfigEntity } from './entities/deviceConfig-entity';
import { DeviceConfigImplementationRepositoryMapper } from './mappers/deviceConfig-repository.mapper';
import { DeviceConfigRepository } from 'src/domain/repositories/deviceConfig.repository';
import { DeviceConfigModel } from 'src/domain/models/deviceConfig.model';
import { API_BASE_URL } from 'src/environments/environment';
import { InputDict } from 'src/base/inputDict';

@Injectable({
    providedIn: 'root',
})
export class DeviceConfigImplementationRepository extends DeviceConfigRepository {
    DeviceConfigMapper = new DeviceConfigImplementationRepositoryMapper();
    constructor(private http: HttpClient) {
        super();
    }
    list_by_device_id(params: {device_id: number }): Observable<Array<DeviceConfigModel>> {
        return this.http
            .get<Array<DeviceConfigModel>>(`${API_BASE_URL}/device/${params.device_id}/device-config`)
            .pipe(map(this.DeviceConfigMapper.mapMultipleFrom));
    }
    store(params: {device_id: number, name: string}): Observable<DeviceConfigModel> {
       return this.http
            .post<DeviceConfigEntity>(`${API_BASE_URL}/device/${params.device_id}/device-config`, params)
            .pipe(map(this.DeviceConfigMapper.mapFrom));
    }
    update(params: {
        _id: string,
        name: string,
        device_id: number,
        input_topic: string,
        input_json: InputDict,
        output_json: InputDict,
        output_topic: string,
        save_output: boolean
    }): Observable<DeviceConfigModel>{
        const config_id = params._id
        const device_id = params.device_id
        const body = {
            name: params.name,
            input_topic: params.input_topic,
            input_json: params.input_json,
            output_json: params.output_json,
            output_topic: params.output_topic
        }
        return this.http.put<DeviceConfigEntity>(`${API_BASE_URL}/device/${device_id}/device-config/${config_id}`, body).pipe(
            map(this.DeviceConfigMapper.mapFrom));
    }
    delete(params: {_id: string, device_id: number}): Observable<null>{
        return this.http.delete<null>(`${API_BASE_URL}/device/${params.device_id}/device-config/${params._id}`);
    }
}
