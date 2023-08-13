import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MqttClientComponent } from './mqtt-client.component';
import { MqttTestComponent } from '../pages/mqtt-test/mqtt-test.component';

const routes: Routes = [
  { path: '', component: MqttClientComponent },
  { path: 'test', component: MqttTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MqttClientRoutingModule { }
