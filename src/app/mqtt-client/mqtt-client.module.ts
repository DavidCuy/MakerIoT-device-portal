import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MqttClientRoutingModule } from './mqtt-client-routing.module';
import { MqttClientComponent } from './mqtt-client.component';

import { MqttTestComponent } from '../pages/mqtt-test/mqtt-test.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MqttClientComponent,
    MqttTestComponent
  ],
  imports: [
    CommonModule,
    MqttClientRoutingModule,
    FormsModule
  ]
})
export class MqttClientModule { }
