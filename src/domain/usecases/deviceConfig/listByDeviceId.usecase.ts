import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceConfigModel } from '../../models/deviceConfig.model';
import { DeviceConfigRepository } from '../../repositories/deviceConfig.repository';
export class DeviceConfigListByDeviceIdUseCase implements UseCase<{device_id: number}, Array<DeviceConfigModel>> {
    constructor(private deviceConfigRepository: DeviceConfigRepository) { }
    execute(
       params: {device_id: number},
    ): Observable<Array<DeviceConfigModel>> {
        return this.deviceConfigRepository.list_by_device_id(params);
    }
}
