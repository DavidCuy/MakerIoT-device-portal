import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MqttClientConfigImplementationRepository } from 'src/data/repositories/mqtt/client-config-implementation.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iot-portal';
  pageName: string = ''
  mqtt_config_client = {
    host: '',
    port: 0,
    protocol: 'ws'
  }

  constructor(private router: Router, private toastr: ToastrService, mqtt_config_imp: MqttClientConfigImplementationRepository) {
    this.mqtt_config_client = mqtt_config_imp.read()
  }

  ngOnInit(): void {
    if (this.mqtt_config_client.host === undefined) {
      this.toastr.warning('No hay configuracion de host', 'Precaucion')
      this.router.navigate(['/settings'])
    }

  }

  update_pagename(pageName: string): void {
    this.pageName = pageName
  }
}
