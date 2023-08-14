import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceModel } from '../../models/device.model';
import { DeviceRepository } from '../../repositories/device.repository';
export class DeviceDeleteUseCase implements UseCase<{id: number}, DeviceModel | null> {
    constructor(private deviceRepository: DeviceRepository) { }
    execute(
       params: {id: number},
    ): Observable<null> {
        return this.deviceRepository.delete(params);
    }
}
