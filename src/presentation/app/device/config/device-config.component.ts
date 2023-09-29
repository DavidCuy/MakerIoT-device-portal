import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputDict } from '../../../../base/inputDict';
import { DeviceConfigModel } from '../../../../domain/models/deviceConfig.model';
import { MqttManagerService } from '../../../../domain/services/mqtt-manager.service';
import { DeviceConfigDeleteUseCase } from '../../../../domain/usecases/deviceConfig/delete.usecase';
import { DeviceConfigListByDeviceIdUseCase } from '../../../../domain/usecases/deviceConfig/listByDeviceId.usecase';
import { DeviceConfigStoreUseCase } from '../../../../domain/usecases/deviceConfig/store.usecase';
import { DeviceConfigUpdateUseCase } from '../../../../domain/usecases/deviceConfig/update.usecase';
import { MqttClientConfigModel } from 'src/domain/models/clientConfig.model';
import Swal from 'sweetalert2';
import { MqttClientConfigImplementationRepository } from 'src/data/repositories/mqtt/client-config-implementation.repository';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit, OnDestroy {
  @ViewChild('deviceConfigModalCloseBtn') deviceConfigModalCloseBtn: ElementRef<HTMLElement>
  @ViewChild('inputJsonTextArea') inputJsonTextArea: ElementRef<HTMLTextAreaElement>
  @ViewChild('outputJsonTextArea') outputJsonTextArea: ElementRef<HTMLTextAreaElement>

  deviceConfigs: DeviceConfigModel[] = []
  device_id: number;
  newName: string;
  selected_config: DeviceConfigModel | undefined;
  selected_config_str: string;
  select_tabname = 'input'

  input_topic: string;
  input_play: boolean = false;

  mqtt_config_client: MqttClientConfigModel = {
    host: '',
    port: 0,
    protocol: 'ws'
  }

  constructor(
    private route: ActivatedRoute,
    private deviceConfigGetByDeviceIdUseCase: DeviceConfigListByDeviceIdUseCase,
    private deviceConfigDeleteUseCase: DeviceConfigDeleteUseCase,
    private deviceConfigStoreUseCase: DeviceConfigStoreUseCase,
    private deviceConfigUpdateUsecase: DeviceConfigUpdateUseCase,
    private mqtt_client_config_imp: MqttClientConfigImplementationRepository,
    public mqttManager: MqttManagerService,
    private toastr: ToastrService
  ) {
    this.mqtt_config_client = this.mqtt_client_config_imp.read();
  }

  ngOnInit(): void {
    this.device_id = Number(this.route.snapshot.params['id']);
    this.deviceConfigGetByDeviceIdUseCase.execute({device_id: this.device_id}).subscribe((resp) => {
      this.deviceConfigs = resp;
      if(this.deviceConfigs.length > 0) {
        this.selected_config = this.deviceConfigs[0];
        this.selected_config_str = this.deviceConfigs[0]._id
        this.input_topic = this.deviceConfigs[0].input_topic
      }
    })
    this.mqttManager.connect(this.mqtt_config_client);
  }

  ngOnDestroy(): void {
    this.mqttManager.all_topic_messages.forEach((tm) => {
      this.mqttManager.remove_topic_subscription(tm.topic)
    })
    this.mqttManager.disconnect()
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
    this.selected_config = this.deviceConfigs.find(dc => dc._id === id)
  }

  tabname_selected(view2show: string) {
    this.select_tabname = view2show
  }

  update_config() {
    let input_json_dict: InputDict = {}
    let output_json_dict: InputDict = {}
    try{
      const input_json_element = JSON.parse(this.inputJsonTextArea.nativeElement.value)
      for (let key of Object.keys(input_json_element)) {
        input_json_dict[key] = typeof input_json_element[key]
      }
    } catch(e) {
      console.error(e)
      this.toastr.error('El valor de entrada tiene que ser un JSON válido')
      return
    }
    if (this.input_topic === "" || this.input_topic === undefined) {
      this.toastr.error('El tema de entrada no puede ser vacío')
      return
    }
    let body = {
      _id: this.selected_config_str,
      name: this.selected_config?.name ?? '',
      device_id: this.device_id,
      input_topic: this.input_topic,
      input_json: input_json_dict,
      output_topic: '',
      output_json: output_json_dict,
      updated_at: new Date().toISOString(),
    }
    this.deviceConfigUpdateUsecase.execute(body).subscribe((resp) => {
      this.selected_config = resp;
      this.toastr.success('Se ha actualizado la configuracion')
    })
  }


  start_input_recording() {
    if (this.input_topic === "" || this.input_topic === undefined) {
      this.toastr.error('El tema de entrada no puede ser vacío')
      return
    }
    this.input_play = !this.input_play;
    if (this.input_play) {
      if (this.mqttManager.all_subscribed_topics.includes(this.input_topic)) return
      this.mqttManager.add_topic_to_subscription(this.input_topic)

      this.mqttManager.subscribe(this.input_topic).subscribe((message) => {
        if (this.input_play) {
          try {
            JSON.parse(message.payload.toString())
            this.inputJsonTextArea.nativeElement.value = message.payload.toString();
          } catch (e) {
            this.toastr.warning('El texto recibido no es un json')
          }
        }
      })
    }
  }
}