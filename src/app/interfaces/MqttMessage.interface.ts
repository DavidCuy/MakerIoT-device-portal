export interface MqttMessage {
  payload: any;
  topic: string;
  datetime: Date;
}
