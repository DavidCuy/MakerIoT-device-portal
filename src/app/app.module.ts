import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfigbarComponent } from './components/configbar/configbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MqttCredentialComponent } from './pages/mqtt-credential/mqtt-credential.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment as env } from '../environments/environment';
import { ConfigComponent } from './pages/config/config.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DeviceComponent } from './pages/device/device.component';
import { HttpClientModule } from '@angular/common/http';


const importModules: (typeof BrowserModule | typeof AppRoutingModule | ModuleWithProviders<MqttModule> | ModuleWithProviders<ToastrModule>  ) [] = [
  BrowserModule,
  AppRoutingModule,
  CommonModule,
  HttpClientModule,
  FormsModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot()
]

const hostIP = localStorage.getItem('hostIP')

if (hostIP !== null) {
  env.hostIP = hostIP
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: env.hostIP,
    port: env.mqtt.port,
    protocol: (env.mqtt.protocol === 'wss') ? 'wss' : 'ws',
    path: '',
  };

  const mqttModule = MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  importModules.push(mqttModule)
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ConfigbarComponent,
    DashboardComponent,
    MqttCredentialComponent,
    ConfigComponent,
    DeviceComponent
  ],
  imports: importModules,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
