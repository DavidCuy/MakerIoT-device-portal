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
import { MqttCredentialComponent } from './mqtt-client/mqtt-credential/mqtt-credential.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { ConfigComponent } from './pages/config/config.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DataModule } from 'src/data/data.module';
import { MqttClientConfigImplementationRepository } from '../../data/repositories/mqtt/client-config-implementation.repository';
import { MqttClientConfigModel } from '../../domain/models/clientConfig.model';
import { CloudSyncComponent } from './pages/cloud-sync/cloud-sync.component';


const importModules: (typeof BrowserModule | typeof AppRoutingModule | ModuleWithProviders<MqttModule> | ModuleWithProviders<ToastrModule>  ) [] = [
  BrowserModule,
  AppRoutingModule,
  CommonModule,
  HttpClientModule,
  FormsModule,
  BrowserAnimationsModule,
  DataModule,
  ToastrModule.forRoot()
]

const mqtt_client_config: MqttClientConfigModel = new MqttClientConfigImplementationRepository().read();
if (mqtt_client_config.host !== null) {
  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    connectOnCreate: false
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
    CloudSyncComponent,
  ],
  imports: importModules,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
