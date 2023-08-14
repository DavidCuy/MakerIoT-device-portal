import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';
import { MqttManagerService } from '../../../../domain/services/mqtt-manager.service';
import { TopicMessage } from 'src/data/repositories/mqtt/entities/topic-entity';
import { MqttMessage } from 'src/data/repositories/mqtt/entities/message-entity';

@Component({
  selector: 'app-mqtt-test',
  templateUrl: './mqtt-test.component.html',
  styleUrls: ['./mqtt-test.component.css']
})
export class MqttTestComponent implements OnInit, OnDestroy {
  select_tabname = 'subscribe'
  selected_topic: string = '';

  subscribed_topics: Array<string> = [];
  topic_messages: Array<TopicMessage> = [];
  displayed_messages: Array<MqttMessage> = [];

  prevMillis: number = new Date().getTime()

  constructor(private mqttManager: MqttManagerService) {
  }

  ngOnInit(): void {
    this.topic_messages = []
  }

  ngOnDestroy(): void {
      this.topic_messages.forEach((tm) => {
        tm.subscription.unsubscribe()
      })
  }

  tabname_selected(tabname: string): void {
    this.select_tabname = tabname
  }

  add_topic_subscribe(input_topic2sub: string): void {
    console.log(`Topic to subscribe ${input_topic2sub}`)
    if (this.subscribed_topics.includes(input_topic2sub)) return

    this.subscribed_topics.unshift(input_topic2sub);
    this.selected_topic = input_topic2sub

    const selected_tm: TopicMessage = {
      topic: this.selected_topic,
      messages: [],
      subscription: this.mqttManager.subscribe(input_topic2sub).subscribe((message: IMqttMessage) => {
        if (new Date().getTime() - this.prevMillis < 100) return
        this.prevMillis = new Date().getTime()
        const wildcard_topics = this.subscribed_topics.filter(m => this.mqttManager.wildcard(message.topic, m) !== null )
        if (wildcard_topics.length > 0) {
          let payload = "";
          try {
            payload = JSON.parse(message.payload.toString());
          } catch (e) {
            payload = message.payload.toString();
          }

          wildcard_topics.forEach(t => {
            let selected_tm = this.topic_messages.find((tm) => tm.topic == t);
            console.log(selected_tm)
            if(selected_tm === null || selected_tm === undefined) return
            const mqtt_message: MqttMessage = {
              datetime: new Date(),
              payload: payload,
              topic: t
            }
            selected_tm?.messages.unshift(mqtt_message)
            console.log(this.topic_messages)
          });
        }
      })
    }
    this.topic_messages.push(selected_tm)

    const search_tm = this.topic_messages.find((tm) => tm.topic == this.selected_topic);
    if(search_tm !== null && search_tm !== undefined) {
      this.displayed_messages = search_tm.messages
    }
  }

  select_topic(topic: string) {
    console.log(topic)
    this.selected_topic = topic;

    const selected_tm = this.topic_messages.find((tm) => tm.topic === topic);
    if(selected_tm === null || selected_tm === undefined) return
    this.displayed_messages = selected_tm.messages
  }

  remove_topic(topic: string) {
    console.log(`Remove topic => ${topic}`);
    const sub_topic = this.topic_messages.find((tm) => tm.topic === topic)
    console.log(sub_topic)
    if(sub_topic === null || sub_topic === undefined) return
    sub_topic.subscription.unsubscribe();

    this.topic_messages = this.topic_messages.filter((tm) => tm.topic !== topic);
    this.subscribed_topics = this.subscribed_topics.filter((t) => t !== topic);
    console.log(this.topic_messages)
  }

  publish_to_topic(topic2publish: string, text2publish: string) {
    this.mqttManager.publish(topic2publish, text2publish);

  }

}
