import { Injectable } from '@angular/core';
import { MqttClientConfigModel } from 'src/domain/models/clientConfig.model';
import { MqttClientConfigRepository } from 'src/domain/repositories/clientConfig.repository';
import { MqttClientConfigRepositoryMapper } from './mappers/client-config-repositor.mapper';

@Injectable({
    providedIn: 'root',
})
export class MqttClientConfigImplementationRepository extends MqttClientConfigRepository {
    mqttClientConfigMapper = new MqttClientConfigRepositoryMapper();
    constructor() {
        super();
    }
    read(): MqttClientConfigModel {
        return this.mqttClientConfigMapper.mapFrom(JSON.parse(localStorage.getItem('mqtt-client') ?? '{}'))
    }
    save(params: {
        host: string,
        port: number,
        username?: string,
        password?: string,
        client_id?: string
    }): MqttClientConfigModel {
        localStorage.setItem('mqtt-client', JSON.stringify(params))
        return this.mqttClientConfigMapper.mapFrom(JSON.parse(localStorage.getItem('mqtt-client') ?? '{}'));
    }
}
