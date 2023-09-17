export interface MqttClientConfigEntity {
    host: string;
    port: number;
    protocol: string;
    username?: string;
    password?: string;
    client_id?: string;
}