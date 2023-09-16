export interface MqttClientConfigModel {
    host: string;
    port: number;
    username?: string;
    password?: string;
    client_id?: string;
}