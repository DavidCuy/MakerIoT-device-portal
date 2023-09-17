import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MqttClientConfigImplementationRepository } from 'src/data/repositories/mqtt/client-config-implementation.repository';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {
  @Output() pageName_emitter = new EventEmitter<string>();
  @Output() breadcrumbs_emitter = new EventEmitter<string[]>();

  router_active = '';
  mqtt_config_client = {
    host: '',
    port: 0,
    protocol: 'ws'
  }

  menu_items: Array<any> = [
    {
      title: 'Dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      url: '/dashboard'
    },
    {
      title: 'Dispositivos',
      name: 'devices',
      icon: 'smartphone',
      url: '/devices'
    },
    {
      title: 'Configuracion',
      name: 'config',
      icon: 'settings',
      url: '/settings'
    }
  ]

  constructor(public router: Router, mqtt_config_imp: MqttClientConfigImplementationRepository) {
    this.mqtt_config_client = mqtt_config_imp.read()
  }

  ngOnInit(): void {
    if (this.mqtt_config_client.host === undefined) {
      this.menu_items.push({
        title: 'MQTT',
        name: 'mqtt',
        icon: 'network_wifi',
        submenu: [{
          title: 'Test',
          name: 'mqtt-client-test',
          url: '/mqtt-client/test'
        }, {
          title: 'Gestor de credenciales',
          name: 'credential-manager',
          url: '/mqtt-client/credential-manager'
        }]
      })
    }
  }

  ngDoCheck(): void {
    let menu_item = this.menu_items.find(mi => mi.url === this.router.url)
    let parent_item: any = null;
    if (menu_item === undefined) {
      this.menu_items.forEach((mi) => {
        if (mi.submenu) {
          menu_item = mi.submenu.find((smi: { url: string; }) => smi.url === this.router.url)
          if (menu_item !== undefined) {
            parent_item = mi
            return
          }
        }
      })
    }
    if (menu_item === undefined) return
    this.router_active = parent_item === null ? null : parent_item.name;
    this.breadcrumbs_emitter.emit(menu_item.title)
    this.pageName_emitter.emit(menu_item.title)
  }

}
