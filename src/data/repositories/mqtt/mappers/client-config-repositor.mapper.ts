import { Mapper } from 'src/base/mapper';
import { MqttClientConfigModel } from 'src/domain/models/clientConfig.model';
import { MqttClientConfigEntity } from '../entities/clientConfig-entity';

//Mapper<DeviceTypeEntity | IndexEntity<DeviceTypeModel>, DeviceTypeModel | IndexEntity<DeviceTypeModel>>
export class MqttClientConfigRepositoryMapper extends Mapper<MqttClientConfigEntity | MqttClientConfigModel, MqttClientConfigModel | MqttClientConfigEntity> {
    mapFrom(param: MqttClientConfigEntity): MqttClientConfigModel {
        return {
            host: param.host,
            port: param.port,
            protocol: param.protocol,
            username: param.username,
            password: param.password,
            client_id: param.client_id
        };
    }
    mapTo(param: MqttClientConfigModel): MqttClientConfigEntity {
        return {
            host: param.host,
            port: param.port,
            protocol: param.protocol,
            username: param.username,
            password: param.password,
            client_id: param.client_id
        }
    }

    mapMultipleFrom(param: MqttClientConfigModel): MqttClientConfigEntity {
        throw 'Not implemented'
    }
}
