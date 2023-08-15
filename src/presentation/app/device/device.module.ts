import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceRoutingModule } from './device-routing.module';

import { DeviceComponent } from './index/device.component';
import { DeviceConfigComponent } from './config/device-config.component';



@NgModule({
  declarations: [
    DeviceComponent,
    DeviceConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
