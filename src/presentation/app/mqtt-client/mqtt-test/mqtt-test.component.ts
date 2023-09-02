import { Component, OnDestroy, OnInit } from '@angular/core';
import { MqttManagerService } from '../../../../domain/services/mqtt-manager.service';
import { MqttMessage } from 'src/data/repositories/mqtt/entities/message-entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mqtt-test',
  templateUrl: './mqtt-test.component.html',
  styleUrls: ['./mqtt-test.component.css']
})
export class MqttTestComponent implements OnInit, OnDestroy {
  select_tabname = 'subscribe'

  displayed_messages: Array<MqttMessage> = [];

  prevMillis: number = new Date().getTime();

  current_topic_sub: Subscription;

  constructor(public mqttManager: MqttManagerService) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this.mqttManager.all_topic_messages.forEach((tm) => {
        this.mqttManager.remove_topic_subscription(tm.topic)
      })
  }

  tabname_selected(tabname: string): void {
    this.select_tabname = tabname
  }

  add_topic_subscribe(input_topic2sub: string): void {
    if (this.mqttManager.all_subscribed_topics.includes(input_topic2sub)) return
    this.mqttManager.add_topic_to_subscription(input_topic2sub)


    this.mqttManager.currentTopic.subscribe(topic => {
      console.log(this.mqttManager.all_subscribed_topics)
    })

    this.mqttManager.currentTopic.subscribe((topic) => {
      this.displayed_messages = topic.messages
    })
  }

  select_topic(topic: string) {
    this.mqttManager.change_current_topic(topic);

    this.mqttManager.currentTopic.subscribe((topic) => {
      console.log(topic)
      this.displayed_messages = topic.messages
    })
  }

  remove_topic(topic: string) {
    console.log(`Remove topic => ${topic}`);
    this.mqttManager.remove_topic_subscription(topic);
  }

  publish_to_topic(topic2publish: string, text2publish: string) {
    if (topic2publish == '') {
      alert('El campo del tema no puede ser vacío')
      return
    }
    this.mqttManager.publish(topic2publish, text2publish);

  }

}
