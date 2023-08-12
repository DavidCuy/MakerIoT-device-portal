import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceModel } from '../../models/device.model';
import { DeviceRepository } from '../../repositories/device.repository';
export class DeviceFindUseCase implements UseCase<{id: number}, DeviceModel> {
    constructor(private deviceRepository: DeviceRepository) { }
    execute(
       params: {id: number},
    ): Observable<DeviceModel> {
        return this.deviceRepository.find(params);
    }
}
