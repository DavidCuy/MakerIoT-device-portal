import { Component, OnInit } from '@angular/core';
import { MqttClientConfigModel } from 'src/domain/models/clientConfig.model';
import { ToastrService } from 'ngx-toastr';
import { MqttClientConfigImplementationRepository } from 'src/data/repositories/mqtt/client-config-implementation.repository';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  mqtt_config_client: MqttClientConfigModel = {
    host: '',
    port: 0,
    protocol: 'ws'
  }
  show_userpass: boolean = false

  constructor(private toastr: ToastrService, private mqttClientConfigServices: MqttClientConfigImplementationRepository) {
    this.mqtt_config_client = this.mqttClientConfigServices.read()
  }

  ngOnInit(): void {
    if(this.mqtt_config_client.username != undefined ||
    this.mqtt_config_client.password != undefined ||
    this.mqtt_config_client.client_id != undefined) {
      this.show_userpass = true
    }
  }

  save_settings(): void {
    if (this.mqtt_config_client.host === '' || this.mqtt_config_client.port === 0) {
      this.toastr.error('No se puede dejar el host, ni el puerto vacío', 'Error')
      return
    }
    this.mqtt_config_client.username = (this.mqtt_config_client.username == '') ? undefined : this.mqtt_config_client.username;
    this.mqtt_config_client.password = (this.mqtt_config_client.password == '') ? undefined : this.mqtt_config_client.password;
    this.mqtt_config_client.client_id = (this.mqtt_config_client.client_id == '') ? undefined : this.mqtt_config_client.client_id;
    this.mqttClientConfigServices.save(this.mqtt_config_client);
    this.toastr.success('Se ha guardado la configuracion', 'Correcto').onHidden.subscribe((toastr) => window.location.reload())
  }

}
