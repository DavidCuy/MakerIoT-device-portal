import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceRoutingModule } from './device-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DeviceComponent } from './index/device.component';
import { DeviceConfigComponent } from './config/device-config.component';
import { DeviceConfigSensorMqttComponent } from './config/sensor/mqtt/device-config-sensor-mqtt.component';



@NgModule({
  declarations: [
    DeviceComponent,
    DeviceConfigComponent,
    DeviceConfigSensorMqttComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
