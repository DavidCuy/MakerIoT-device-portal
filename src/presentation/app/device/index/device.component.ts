import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeIndexUseCase } from 'src/domain/usecases/deviceType/index.usecase';
import { DeviceIndexUseCase } from 'src/domain/usecases/device/index.usecase';
import { DeviceStoreUseCase } from 'src/domain/usecases/device/store.usecase';
import { DeviceDeleteUseCase } from 'src/domain/usecases/device/delete.usecase';
import { DeviceModel } from 'src/domain/models/device.model';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  PAGE_SIZE: number = 10;

  @ViewChild('deviceModalCloseBtn') deviceModalCloseBtn: ElementRef<HTMLElement>
  indexObject: IndexEntity<DeviceModel>;
  devices: DeviceModel[] = []

  deviceTypes: DeviceTypeModel[] = []

  newName: string = ''
  newSerial: string = ''
  newDeviceType: number = -1
  currentPage: number = 1;
  searchName: string = ''

  constructor(
    private deviceTypeIndexUsecase: DeviceTypeIndexUseCase,
    private deviceIndexUseCase: DeviceIndexUseCase,
    private deviceStoreUseCase: DeviceStoreUseCase,
    private deviceDeleteUseCase: DeviceDeleteUseCase,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.deviceTypeIndexUsecase.execute().subscribe((resp) => {
      this.deviceTypes = resp.Data;
    })

    this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((resp) => {
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
      this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((respIn) => {
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

  changePage(added_page: number) {
    this.currentPage = this.currentPage + added_page;
    this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((resp) => {
      this.indexObject = resp;
      this.devices = this.indexObject.Data;
    })
  }

  search(input: string) {
    if (input.length > 0 && input.length <= 3) return

    if (input.length == 0) {
      this.currentPage = 1
      this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((resp) => {
        this.indexObject = resp;
        this.devices = this.indexObject.Data;
      })
    }

    let serachByColum = [{name: 'name', value: input}]

    this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage, searchByColumn: serachByColum }).subscribe((resp) => {
      this.indexObject = resp;
      this.devices = this.indexObject.Data;
      this.currentPage = 1
    })
  }

  delete_device(id: number) {
    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deviceDeleteUseCase.execute({id: id}).subscribe(() => {
          Swal.fire('Se ha eliminado!', '', 'success')
          this.deviceIndexUseCase.execute({ relationships: ['deviceType'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((resp) => {
            this.indexObject = resp;
            this.devices = this.indexObject.Data;
            this.currentPage = 1
          })
        })
      }
    })
  }

  navigate_config(device_id: number, device_com: string) {
    const selected_device = this.devices.find(d => d.id == device_id)
    if (!selected_device?.deviceType?.enabled_config) {
      this.toastr.warning('Configuración no disponible')
      return
    }
    this.router.navigate(['/devices', device_id, 'config'], { queryParams: { device_type: 'sensor', device_comunication: device_com }})
  }
}
