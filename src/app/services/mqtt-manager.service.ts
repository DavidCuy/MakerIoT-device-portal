import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MqttService, IMqttMessage, IOnConnectEvent, IOnErrorEvent } from 'ngx-mqtt';


@Injectable({
  providedIn: 'root'
})
export class MqttManagerService {
  constructor(private _mqttService: MqttService) {
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

  public publish(topic: string, message: any): void {
    this._mqttService.unsafePublish(topic, JSON.stringify(message), {qos: 1, retain: true});
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
}
