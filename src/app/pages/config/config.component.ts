import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  hostIP = ''

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    let cur_hostIP = localStorage.getItem('hostIP')
    if (cur_hostIP != null) {
      this.hostIP = cur_hostIP
    }
  }

  save_settings(): void {
    if (this.hostIP === '') {
      this.toastr.error('No se puede dejar el host vacio', 'Error')
      return
    }
    localStorage.setItem('hostIP', this.hostIP)
    env.hostIP = this.hostIP
    this.toastr.success('Se ha guardado la configuracion', 'Correcto').onHidden.subscribe((toastr) => window.location.reload())
  }

}
