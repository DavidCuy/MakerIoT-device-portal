import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigComponent } from './pages/config/config.component';
import { CloudSyncComponent } from './pages/cloud-sync/cloud-sync.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "settings", component: ConfigComponent },
  { path: "cloud-sync", component: CloudSyncComponent },
  { path: "devices", loadChildren: () => import('./device/device.module').then(m => m.DeviceModule) },
  { path: "mqtt-client", loadChildren: () => import('./mqtt-client/mqtt-client.module').then(m => m.MqttClientModule) },
  { path: "",   redirectTo: "dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
