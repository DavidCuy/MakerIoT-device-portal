export interface MqttClientConfigModel {
    host: string;
    port: number;
    protocol: string;
    username?: string;
    password?: string;
    client_id?: string;
}