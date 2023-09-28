import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceConfigModel } from 'src/domain/models/deviceConfig.model';
import { DeviceConfigDeleteUseCase } from 'src/domain/usecases/deviceConfig/delete.usecase';
import { DeviceConfigListByDeviceIdUseCase } from 'src/domain/usecases/deviceConfig/listByDeviceId.usecase';
import { DeviceConfigStoreUseCase } from 'src/domain/usecases/deviceConfig/store.usecase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit {
  @ViewChild('deviceConfigModalCloseBtn') deviceConfigModalCloseBtn: ElementRef<HTMLElement>

  deviceConfigs: DeviceConfigModel[] = []
  device_id: number;
  newName: string;
  selected_config: DeviceConfigModel;
  selected_config_str: string;
  select_tabname = 'input'

  constructor(
    private route: ActivatedRoute,
    private deviceConfigGetByDeviceIdUseCase: DeviceConfigListByDeviceIdUseCase,
    private deviceConfigDeleteUseCase: DeviceConfigDeleteUseCase,
    private deviceConfigStoreUseCase: DeviceConfigStoreUseCase,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.device_id = Number(this.route.snapshot.params['id']);
    this.deviceConfigGetByDeviceIdUseCase.execute({device_id: this.device_id}).subscribe((resp) => {
      this.deviceConfigs = resp;
      if(this.deviceConfigs.length > 0) {
        this.selected_config = this.deviceConfigs[0];
        this.selected_config_str = this.deviceConfigs[0]._id
      }
    })
  }

  delete_config(id: string) {
    Swal.fire({
      title: '¿Seguro que desea eliminar la configuración?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deviceConfigDeleteUseCase.execute({device_id: this.device_id, _id: id}).subscribe(() => {
          Swal.fire('Se ha eliminado exitosamente!', '', 'success')
          this.deviceConfigGetByDeviceIdUseCase.execute({device_id: this.device_id}).subscribe((resp) => {
            this.deviceConfigs = resp;
          })
        })
      }
    })
  }

  create_config() {
    const body = {
      name: this.newName,
      device_id: this.device_id
    }

    this.deviceConfigStoreUseCase.execute(body).subscribe(resp => {
      this.deviceConfigGetByDeviceIdUseCase.execute({device_id: this.device_id}).subscribe((resp) => {
        this.deviceConfigs = resp;
      })
      this.toastr.success('Se ha creado la configuración correctamente', 'Correcto').onHidden.subscribe((toastr) => {
        this.deviceConfigModalCloseBtn.nativeElement.click()
      });
    }, err => {
      console.error(err)
      this.toastr.error('Ocurrio un error', 'error')
    });
  }

  selected_config_control(id: string) {
    this.selected_config_str = id
  }

  tabname_selected(view2show: string) {
    this.select_tabname = view2show
  }
}