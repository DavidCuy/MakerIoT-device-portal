import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MqttService, IMqttMessage, IOnConnectEvent, IOnErrorEvent, IMqttServiceOptions } from 'ngx-mqtt';
import { TopicMessage } from 'src/data/repositories/mqtt/entities/topic-entity';
import { MqttMessage } from 'src/data/repositories/mqtt/entities/message-entity';
import { MqttClientConfigModel } from '../models/clientConfig.model';


@Injectable({
  providedIn: 'root'
})
export class MqttManagerService {
  private currentTopicSubject: BehaviorSubject<TopicMessage> = new BehaviorSubject({} as TopicMessage);
  public readonly currentTopic: Observable<TopicMessage> = this.currentTopicSubject.asObservable();
  private prevMillis: number = new Date().getTime();
  public all_topic_messages: Array<TopicMessage> = [];
  public all_subscribed_topics: Array<string> = [];
  public selected_topic_str: string = '';

  constructor(private toastr: ToastrService, private _mqttService: MqttService) {
    this._mqttService.onConnect.subscribe(async (connectStatus: IOnConnectEvent) => {
      console.log('CONNECT MQTT');
      console.log(connectStatus);
    });

    this._mqttService.onReconnect.subscribe(async (connectStatus: any) => {
      console.warn('RECONNECT MQTT');
      console.warn(connectStatus);
    });

    this._mqttService.onError.subscribe(async (error: IOnErrorEvent) => {
      console.error('ERROR MQTT');
      console.error(error);
      this.toastr.error('Ocurrio un error, al intentar conectar. Revise su configuracion', 'MQTT Error')
    });

    this._mqttService.onEnd.subscribe((connectStatus: any) => {
      console.warn('END MQTT');
      console.warn(connectStatus);
    });

    this._mqttService.onOffline.subscribe(async (connectStatus: any) => {
      console.warn('OFFLINE MQTT');
      console.warn(connectStatus);
    });
  }

  public connect(mqtt_config_client: MqttClientConfigModel): void {
    const options: IMqttServiceOptions = {
      hostname: mqtt_config_client.host,
      port: mqtt_config_client.port,
      protocol: (mqtt_config_client.protocol === 'wss') ? 'wss' : 'ws',
      path: '',
    }
    try {
      this._mqttService.connect(options);
    } catch(e) {
      console.error(e);
    }
  }

  public disconnect(): void {
    this._mqttService.disconnect()
  }

  public publish(topic: string, message: any): void {
    this._mqttService.unsafePublish(topic, JSON.stringify(message, null, 4), {qos: 1, retain: true});
  }

  public subscribe(topic: string): Observable<IMqttMessage> {
    return this._mqttService.observe(topic)
  }

  public wildcard(topic: string, wildcard: string) : Array<string> | null {
    if (topic === wildcard) {
        return [];
    } else if (wildcard === '#') {
        return [topic];
    }

    let res = [];

    let t = String(topic).split('/');
    let w = String(wildcard).split('/');

    let i = 0;
    for (let lt = t.length; i < lt; i++) {
        if (w[i] === '+') {
            res.push(t[i]);
        } else if (w[i] === '#') {
            res.push(t.slice(i).join('/'));
            return res;
        } else if (w[i] !== t[i]) {
            return null;
        }
    }

    if (w[i] === '#') {
        i += 1;
    }

    return (i === w.length) ? res : null;
  }

  private _onConnectMqtt(): void {

  }

  public add_topic_to_subscription(input_topic2sub: string): void {
    const selected_tm: TopicMessage = {
      topic: input_topic2sub,
      messages: [],
      subscription: this.subscribe(input_topic2sub).subscribe((message: IMqttMessage) => {
        console.log(message)
        if (new Date().getTime() - this.prevMillis < 100) return
        this.prevMillis = new Date().getTime()
        const wildcard_topics = this.all_subscribed_topics.filter(m => this.wildcard(message.topic, m) !== null )
        if (wildcard_topics.length > 0) {
          let payload = "";
          try {
            payload = JSON.parse(message.payload.toString());
          } catch (e) {
            payload = message.payload.toString();
          }

          wildcard_topics.forEach(t => {
            let selected_tm = this.all_topic_messages.find((tm) => tm.topic == t);
            if(selected_tm === null || selected_tm === undefined) return
            const mqtt_message: MqttMessage = {
              datetime: new Date(),
              payload: payload,
              topic: t
            }
            selected_tm?.messages.unshift(mqtt_message)
          });
        }
      })
    }
    this.all_topic_messages.push(selected_tm);
    this.all_subscribed_topics.push(input_topic2sub);
    this.change_current_topic(input_topic2sub)
  }

  public remove_topic_subscription(input_topic: string): void {
    const sub_topic = this.all_topic_messages.find((tm) => tm.topic === input_topic)
    if(sub_topic === null || sub_topic === undefined) return
    sub_topic.subscription.unsubscribe();

    this.all_topic_messages = this.all_topic_messages.filter((tm) => tm.topic !== input_topic);
    this.all_subscribed_topics = this.all_subscribed_topics.filter((t) => t !== input_topic);
  }

  public change_current_topic(input_topic: string): void {
    const evaluated_tm = this.all_topic_messages.find((tm) => tm.topic === input_topic);
    if(evaluated_tm === null || evaluated_tm === undefined) return

    this.currentTopicSubject.next(evaluated_tm)
    this.selected_topic_str = input_topic
  }
}
