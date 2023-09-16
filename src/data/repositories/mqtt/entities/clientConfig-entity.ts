export interface MqttClientConfigEntity {
    host: string;
    port: number;
    username?: string;
    password?: string;
    client_id?: string;
}