import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeIndexUseCase } from 'src/domain/usecases/deviceType/index.usecase';
import { DeviceIndexUseCase } from 'src/domain/usecases/device/index.usecase';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @ViewChild('deviceModalCloseBtn') deviceModalCloseBtn: ElementRef<HTMLElement>
  devices: any[] = []

  deviceTypes: any[] = []

  newName: string = ''
  newSerial: string = ''
  newDeviceType: number = -1

  constructor(
    private deviceTypeIndexUsecase: DeviceTypeIndexUseCase,
    private deviceIndexUseCase: DeviceIndexUseCase,
    private toastr: ToastrService, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceTypeIndexUsecase.execute().subscribe((resp) => {
      this.deviceTypes = resp;
    })

    this.deviceIndexUseCase.execute({ relationships: ['deviceType'] }).subscribe((resp) => {
      this.devices = resp;
      console.log(resp)
    })
  }

  createDevice() {
    const body = {
      id_device_type: this.newDeviceType,
      name: this.newName,
      serial: this.newSerial
    }

    this.deviceService.create(body).subscribe(resp => {
      console.log(resp)
      this.deviceService.get([ {name: 'relationships', value: 'deviceType'}]).subscribe((resp) => {
        this.devices = resp.Data;
      })
      this.toastr.success('Se ha creado dispositivo correctamente', 'Correcto').onHidden.subscribe((toastr) => {
        this.deviceModalCloseBtn.nativeElement.click()
      })
    }, err => {
      console.error(err)
      this.toastr.error('Ocurrio un error', 'error')
    })
  }

}
