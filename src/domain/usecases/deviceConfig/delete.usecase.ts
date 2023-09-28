import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceConfigRepository } from '../../repositories/deviceConfig.repository';
export class DeviceConfigDeleteUseCase implements UseCase<{_id: string, device_id: number}, null> {
    constructor(private deviceConfigRepository: DeviceConfigRepository) { }
    execute(
       params: {_id: string, device_id: number},
    ): Observable<null> {
        return this.deviceConfigRepository.delete(params);
    }
}
