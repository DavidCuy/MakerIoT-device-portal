import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './index/device.component';
import { DeviceConfigComponent } from './config/device-config.component';

const routes: Routes = [
  { path: '', component: DeviceComponent },
  { path: ':id/config', component: DeviceConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
