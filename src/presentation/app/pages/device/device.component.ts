import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeIndexUseCase } from 'src/domain/usecases/deviceType/index.usecase';
import { DeviceIndexUseCase } from 'src/domain/usecases/device/index.usecase';
import { DeviceStoreUseCase } from 'src/domain/usecases/device/store.usecase';
import { DeviceModel } from 'src/domain/models/device.model';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @ViewChild('deviceModalCloseBtn') deviceModalCloseBtn: ElementRef<HTMLElement>
  indexObject: IndexEntity<DeviceModel>;
  devices: DeviceModel[] = []

  deviceTypes: DeviceTypeModel[] = []

  newName: string = ''
  newSerial: string = ''
  newDeviceType: number = -1
  showNext: boolean = false;
  showPrev: boolean = false;

  constructor(
    private deviceTypeIndexUsecase: DeviceTypeIndexUseCase,
    private deviceIndexUseCase: DeviceIndexUseCase,
    private deviceStoreUseCase: DeviceStoreUseCase,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.deviceTypeIndexUsecase.execute().subscribe((resp) => {
      this.deviceTypes = resp.Data;
    })

    this.deviceIndexUseCase.execute({ relationships: ['deviceType'] }).subscribe((resp) => {
      this.indexObject = resp;
      this.devices = this.indexObject.Data;
    })
  }

  createDevice() {
    const body = {
      id_device_type: this.newDeviceType,
      name: this.newName,
      serial: this.newSerial
    }

    this.deviceStoreUseCase.execute(body).subscribe(resp => {
      this.deviceIndexUseCase.execute({ relationships: ['deviceType'] }).subscribe((respIn) => {
        this.devices = respIn.Data;
      })
      this.toastr.success('Se ha creado dispositivo correctamente', 'Correcto').onHidden.subscribe((toastr) => {
        this.deviceModalCloseBtn.nativeElement.click()
      });
    }, err => {
      console.error(err)
      this.toastr.error('Ocurrio un error', 'error')
    });
  }

}
