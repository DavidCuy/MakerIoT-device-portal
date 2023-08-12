import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceTypeModel } from '../../models/deviceType.model';
import { DeviceTypeRepository } from '../../repositories/deviceType.repository';
export class DeviceTypeFindUseCase implements UseCase<{id: number}, DeviceTypeModel> {
    constructor(private deviceRepository: DeviceTypeRepository) { }
    execute(
       params: {id: number},
    ): Observable<DeviceTypeModel> {
        return this.deviceRepository.find(params);
    }
}
