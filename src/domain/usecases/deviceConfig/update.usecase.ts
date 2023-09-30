import { Observable } from 'rxjs';
import { InputDict } from "src/base/inputDict";
import { UseCase } from '../../../base/use-case';
import { DeviceConfigModel } from '../../models/deviceConfig.model';
import { DeviceConfigRepository } from '../../repositories/deviceConfig.repository';
export class DeviceConfigUpdateUseCase implements UseCase<{
        _id: string,
        name: string,
        device_id: number,
        input_topic: string,
        input_json: InputDict,
        output_json: InputDict,
        output_topic: string
    }, DeviceConfigModel> {
    constructor(private deviceConfigRepository: DeviceConfigRepository) { }
    execute(
        params: {
            _id: string,
            name: string,
            device_id: number,
            input_topic: string,
            input_json: InputDict,
            output_json: InputDict,
            output_topic: string
        },
    ): Observable<DeviceConfigModel> {
        return this.deviceConfigRepository.update(params);
    }
}
