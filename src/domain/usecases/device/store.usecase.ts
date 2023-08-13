import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceModel } from '../../models/device.model';
import { DeviceRepository } from '../../repositories/device.repository';
export class DeviceStoreUseCase implements UseCase<{id_device_type: number, name: string, serial: string}, DeviceModel> {
    constructor(private deviceRepository: DeviceRepository) { }
    execute(
       params: {id_device_type: number, name: string, serial: string},
    ): Observable<DeviceModel> {
        return this.deviceRepository.store(params);
    }
}
