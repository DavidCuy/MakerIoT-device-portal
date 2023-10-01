import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit {


  device_id: number;
  devive_com: string;
  device_type: string

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.device_id = Number(this.route.snapshot.params['id'])
    this.route.queryParams.subscribe(params => {
      if ('device_type' in params) this.device_type = String(params['device_type']).toLowerCase()
      if ('device_comunication' in params) this.devive_com = String(params['device_comunication']).toLowerCase()
    })
  }
  
}