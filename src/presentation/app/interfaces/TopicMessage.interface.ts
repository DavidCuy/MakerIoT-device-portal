import { MqttMessage } from './MqttMessage.interface'
import { Subscription } from 'rxjs';

export interface TopicMessage {
  topic: string;
  messages: Array<MqttMessage>;
  subscription: Subscription;
}
