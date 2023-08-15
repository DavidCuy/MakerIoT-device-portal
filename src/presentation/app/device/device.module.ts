import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceRoutingModule } from './device-routing.module';

import { DeviceComponent } from '../pages/device/device.component';



@NgModule({
  declarations: [
    DeviceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule { }
