import { Mapper } from 'src/base/mapper';
import { DeviceConfigModel } from 'src/domain/models/deviceConfig.model';
import { DeviceConfigEntity } from '../entities/deviceConfig-entity';


export class DeviceConfigImplementationRepositoryMapper extends Mapper<DeviceConfigEntity | DeviceConfigModel | Array<DeviceConfigModel>, DeviceConfigModel | DeviceConfigEntity | Array<DeviceConfigEntity>> {
    mapFrom(param: DeviceConfigEntity): DeviceConfigModel {
        return {
            _id: param._id,
            name: param.name,
            device_id: param.device_id,
            input_topic: param.input_topic,
            input_json: param.input_json,
            output_json: param.output_json,
            output_topic: param.output_topic,
            save_output: param.save_output,
            created_at: param.created_at,
            updated_at: param.updated_at
        };
    }
    mapTo(param: DeviceConfigModel): DeviceConfigEntity {
        return {
            _id: param._id,
            name: param.name,
            device_id: param.device_id,
            input_topic: param.input_topic,
            input_json: param.input_json,
            output_json: param.output_json,
            output_topic: param.output_topic,
            save_output: param.save_output,
            created_at: param.created_at,
            updated_at: param.updated_at
        }
    }

    mapMultipleFrom(param: Array<DeviceConfigModel>): Array<DeviceConfigEntity> {
        let output_list = []
        for(let item of param){
            output_list.push({
                _id: item._id,
                name: item.name,
                device_id: item.device_id,
                input_topic: item.input_topic,
                input_json: item.input_json,
                output_json: item.output_json,
                output_topic: item.output_topic,
                save_output: item.save_output,
                created_at: item.created_at,
                updated_at: item.updated_at
            })
        }
        return output_list
    }
}
