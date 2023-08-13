import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iot-portal';

  pageName: string = ''

  constructor(private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (env.hostIP === '' || env.hostIP === null) {
      this.toastr.warning('No hay configuracion de host', 'Precaucion')
      this.router.navigate(['/settings'])
    }

  }

  update_pagename(pageName: string): void {
    this.pageName = pageName
  }
}
