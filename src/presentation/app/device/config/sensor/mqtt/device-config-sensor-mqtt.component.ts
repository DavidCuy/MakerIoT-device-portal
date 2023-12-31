import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputDict } from 'src/base/inputDict';
import { DeviceConfigModel } from 'src/domain/models/deviceConfig.model';
import { MqttManagerService } from 'src/domain/services/mqtt-manager.service';
import { DeviceConfigDeleteUseCase } from 'src/domain/usecases/deviceConfig/delete.usecase';
import { DeviceConfigListByDeviceIdUseCase } from 'src/domain/usecases/deviceConfig/listByDeviceId.usecase';
import { DeviceConfigStoreUseCase } from 'src/domain/usecases/deviceConfig/store.usecase';
import { DeviceConfigUpdateUseCase } from 'src/domain/usecases/deviceConfig/update.usecase';
import { MqttClientConfigModel } from 'src/domain/models/clientConfig.model';
import { MqttClientConfigImplementationRepository } from 'src/data/repositories/mqtt/client-config-implementation.repository';
import { evaluate } from 'mathjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-config-sensor-mqtt',
  templateUrl: './device-config-sensor-mqtt.component.html',
  styleUrls: ['./device-config-sensor-mqtt.component.css']
})
export class DeviceConfigSensorMqttComponent implements OnInit, OnDestroy {
  @ViewChild('deviceConfigModalCloseBtn') deviceConfigModalCloseBtn: ElementRef<HTMLElement>
  @ViewChild('inputJsonTextArea') inputJsonTextArea: ElementRef<HTMLTextAreaElement>
  @ViewChild('editorJsonTextArea') editorJsonTextArea: ElementRef<HTMLTextAreaElement>
  @ViewChild('outputJsonTextArea') outputJsonTextArea: ElementRef<HTMLTextAreaElement>

  @Input() editor_form!: FormGroup;
  @Input() device_id: number;

  deviceConfigs: DeviceConfigModel[] = []
  newName: string;
  selected_config: DeviceConfigModel | undefined;
  selected_config_str: string;
  select_tabname = 'input'

  input_topic: string;
  input_play: boolean = false;
  editor_play: boolean = false;

  mqtt_config_client: MqttClientConfigModel = {
    host: '',
    port: 0,
    protocol: 'ws'
  }
  output_topic: string;
  output_json: any = {}
  editorFormField: Array<string> = [];

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
        this.output_topic = this.deviceConfigs[0].output_topic
        this.output_json = this.deviceConfigs[0].output_json

        this.initialize_formgroup()
      }
    })
    this.mqttManager.connect(this.mqtt_config_client);
  }

  initialize_formgroup() {
    const group: any = {}
    this.editorFormField = []
    Object.keys(this.output_json).forEach(key => {
      group[key] = new FormControl(this.output_json[key]);
      this.editorFormField.push(key)
    })

    this.editor_form = new FormGroup(group)
  }

  ngOnDestroy(): void {
    this.mqttManager.all_topic_messages.forEach((tm) => {
      this.mqttManager.remove_topic_subscription(tm.topic)
    })
    this.mqttManager.disconnect()
  }

  get_keys_config(): Array<string> {
    return Object.keys(this.selected_config!.input_json)
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
          if(this.selected_config?._id === id) {
            this.selected_config = undefined
            this.selected_config_str = ""
            this.input_topic = ""
            this.output_topic = ""
            this.output_json = null
            this.select_tabname = "input"
            this.initialize_formgroup()
          }
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
    if (this.selected_config) {
      this.selected_config_str = this.selected_config._id
      this.input_topic = this.selected_config.input_topic
      this.output_topic = this.selected_config.output_topic
      this.output_json = this.selected_config.output_json
      this.initialize_formgroup()

      if (this.input_topic === undefined || this.input_topic === "") {
        this.select_tabname = 'input'
      }
    }
  }

  tabname_selected(view2show: string) {
    this.input_play = false
    this.editor_play = false
    if(view2show == 'editor') {
      if (this.selected_config?.input_topic === undefined || this.selected_config?.input_topic === "") {
        view2show = 'input'
        this.toastr.warning('No se puede mostrar el editor sin definir tema de entrada')
      }
    }
    this.select_tabname = view2show
  }

  update_config() {
    let input_json_dict: InputDict = {}
    try{
      if (this.select_tabname === 'input'){
        const input_json_element = JSON.parse(this.inputJsonTextArea.nativeElement.value)
        for (let key of Object.keys(input_json_element)) {
          input_json_dict[key] = typeof input_json_element[key]
        }
      } else {
        input_json_dict = this.selected_config!.input_json;
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
      output_topic: this.output_topic,
      output_json: this.editor_form.getRawValue(),
      save_output: this.selected_config?.save_output ?? false
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

  async add_editor_variable() {
    const { value: variable_key } = await Swal.fire({
      title: 'Nombre de tu variable',
      input: 'text',
      inputLabel: 'Variable',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'El campo no puede ser vacío!'
        }
      }
    })

    if (variable_key) {
      console.log(variable_key)
      this.editor_form.addControl(variable_key, new FormControl(""))
      this.editorFormField.push(variable_key)
    }
  }

  delete_editor_variable(key: string) {
    this.editor_form.removeControl(key)
    this.editorFormField = this.editorFormField.filter(k => k != key)
  }

  start_editor_recording() {
    this.editor_play = !this.editor_play;
    if (this.editor_play) {
      if (!this.mqttManager.all_subscribed_topics.includes(this.input_topic)) {
        this.mqttManager.add_topic_to_subscription(this.input_topic)
      }

      if (this.mqttManager.all_subscribed_topics.includes(this.output_topic)) return
      this.mqttManager.add_topic_to_subscription(this.output_topic)

      this.mqttManager.subscribe(this.input_topic).subscribe((message) => {
        if (this.editor_play) {
          try {
            const message_payload = JSON.parse(message.payload.toString())
            console.log(message_payload)
            const message_to_publish: any = {}

            for(let key of this.editorFormField) {
              console.log(this.editor_form.get(key)?.value)
              message_to_publish[key] = evaluate(this.editor_form.get(key)?.value, message_payload)
            }
            this.editorJsonTextArea.nativeElement.value = JSON.stringify(message_to_publish, null, 4)
          } catch (e) {
            this.toastr.warning('El texto recibido no es un json')
            console.error(e)
          }
        }
      })
    }
  }
}