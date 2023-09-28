import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceConfigModel } from '../../models/deviceConfig.model';
import { DeviceConfigRepository } from '../../repositories/deviceConfig.repository';
export class DeviceConfigStoreUseCase implements UseCase<{device_id: number, name: string}, DeviceConfigModel> {
    constructor(private deviceConfigRepository: DeviceConfigRepository) { }
    execute(
        params: {device_id: number, name: string},
    ): Observable<DeviceConfigModel> {
        return this.deviceConfigRepository.store(params);
    }
}
