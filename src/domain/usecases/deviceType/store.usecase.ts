import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceTypeModel } from '../../models/deviceType.model';
import { DeviceTypeRepository } from '../../repositories/deviceType.repository';
export class DeviceTypeStoreUseCase implements UseCase<{name: string}, DeviceTypeModel> {
    constructor(private deviceTypeRepository: DeviceTypeRepository) { }
    execute(
       params: {name: string},
    ): Observable<DeviceTypeModel> {
        return this.deviceTypeRepository.store(params);
    }
}
