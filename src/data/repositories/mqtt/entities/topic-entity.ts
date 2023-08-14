import { MqttMessage } from './message-entity'
import { Subscription } from 'rxjs';

export interface TopicMessage {
  topic: string;
  messages: Array<MqttMessage>;
  subscription: Subscription;
}
