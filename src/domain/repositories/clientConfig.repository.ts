import { MqttClientConfigModel } from '../models/clientConfig.model';
export abstract class MqttClientConfigRepository {
    abstract read(params: {}): MqttClientConfigModel;
    abstract save(params: {
        host: string,
        port: number,
        username?: string,
        password?: string,
        client_id?: string
    }): MqttClientConfigModel;
}
