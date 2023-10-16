import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CloudProviderIndexUseCase } from 'src/domain/usecases/cloudProvider/index.usecase';
import { CloudConfigIndexUseCase } from 'src/domain/usecases/cloudConfig/index.usecase';
import { CloudConfigStoreUseCase } from 'src/domain/usecases/cloudConfig/store.usecase';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { CloudConfigModel } from 'src/domain/models/cloudConfig.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
import Swal from 'sweetalert2';
import { CloudConfigDeleteUseCase } from 'src/domain/usecases/cloudConfig/delete.usecase';

@Component({
  selector: 'app-cloud-sync',
  templateUrl: './cloud-sync.component.html',
  styleUrls: ['./cloud-sync.component.css']
})
export class CloudSyncComponent implements OnInit {
  PAGE_SIZE: number = 10;

  indexCloudConfigObject: IndexEntity<CloudConfigModel>;
  cloudProviders: CloudProviderModel[] = []
  cloudConfigs: CloudConfigModel[] = []

  currentPage: number = 1;

  constructor(
    private cloudProviderIndexUsecase: CloudProviderIndexUseCase,
    private cloudConfigIndexUseCase: CloudConfigIndexUseCase,
    private cloudConfigStoreUseCase: CloudConfigStoreUseCase,
    private cloudConfigDeleteUseCase: CloudConfigDeleteUseCase,
    private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    this.cloudProviderIndexUsecase.execute().subscribe((resp) => {
      this.cloudProviders = resp.Data;
      console.log(this.cloudProviders)
    })

    this.cloudConfigIndexUseCase.execute({ relationships: ['cloudProvider'], perPage: this.PAGE_SIZE, page: this.currentPage }).subscribe((resp) => {
      this.indexCloudConfigObject = resp;
      this.cloudConfigs = this.indexCloudConfigObject.Data;
      console.log(this.cloudConfigs)
    })
  }

  new_config(provider_id: number) {
    let provider = this.cloudProviders.find(cp => cp.id == provider_id);

    if (provider?.key == 'aws'){
      this.aws_provider_swal(provider_id)
    }
  }

  aws_provider_swal(provider_id: number) {
    Swal.fire({
      title: 'Nueva configuracion de AWS',
      html: `<label for="swal2-input-aws-account-id" class="swal2-input-label">Cuenta de AWS</label>
        <input id="swal2-input-aws-account-id" class="swal2-input" onkeypress="document.getElementById('swal2-aws-validation-message').style.display = 'none'">

        <label for="swal2-input-aws-region" class="swal2-input-label">Region</label>
        <input id="swal2-input-aws-region" class="swal2-input" onkeypress="document.getElementById('swal2-aws-validation-message').style.display = 'none'">

        <label for="swal2-input-aws-access-key-id" class="swal2-input-label">AWS Access Key Id</label>
        <input id="swal2-input-aws-access-key-id" class="swal2-input" onkeypress="document.getElementById('swal2-aws-validation-message').style.display = 'none'">
        
        <label for="swal2-input-aws-access-key-secret" class="swal2-input-label">AWS Access Key Secret</label>
        <input id="swal2-input-aws-access-key-secret" class="swal2-input" onkeypress="document.getElementById('swal2-aws-validation-message').style.display = 'none'">
        
        <div class="swal2-validation-message" id="swal2-aws-validation-message" style="display: none;">Los campos no pueden estar vacios</div>`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
      preConfirm: () => {
        let account_id = (<HTMLInputElement>document.getElementById('swal2-input-aws-account-id'))?.value;
        let aws_region = (<HTMLInputElement>document.getElementById('swal2-input-aws-region'))?.value;
        let access_key_id = (<HTMLInputElement>document.getElementById('swal2-input-aws-access-key-id'))?.value;
        let access_key_secret = (<HTMLInputElement>document.getElementById('swal2-input-aws-access-key-secret'))?.value;

        if (!access_key_id || !access_key_secret) {
          document.getElementById('swal2-aws-validation-message')!.style.display = 'flex';
          return false
        }

        return {
          'id_cloud_provider': provider_id,
          'provider': 'aws',
          'account_id': account_id,
          'region': aws_region,
          'access_key_id': access_key_id,
          'access_key_secret': access_key_secret,
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.cloudConfigStoreUseCase.execute(result.value).subscribe(() => {
          this.cloudConfigIndexUseCase.execute().subscribe((resp) => {
            this.cloudConfigs = resp.Data
            this.toastr.success('Configuración creada')
          }, (error) => {
            this.toastr.error('Ocurrió un error')
            console.error(error)
          })
        })
      }
    })
  }

  delete_integration(id_cloud_integration: number) {
    let cloudConfig = this.cloudConfigs.find(cc => cc.id == id_cloud_integration);
    Swal.fire({
      title: `¿Seguro que desea eliminar ${cloudConfig?.profile}?`,
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cloudConfigDeleteUseCase.execute({ id: id_cloud_integration }).subscribe((resp) => {
          this.cloudConfigIndexUseCase.execute().subscribe((resp) => {
            this.cloudConfigs = resp.Data
            Swal.fire(
              '¡Eliminado!',
              'La configuración se ha eliminado.',
              'success'
            )
          }, (error) => {
            this.toastr.error('Ocurrió un error')
            console.error(error)
          })
        })
      }
    })
  }

  enabled_conf(id_cloud_integration: number) {
    let cloudConfig = this.cloudConfigs.find(cc => cc.id == id_cloud_integration);
    Swal.fire({
      title: `¿Seguro que desea habilitar la integración para ${cloudConfig?.profile}?`,
      text: "Una vez habilitada no se puede deshabilitar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toastr.success('Se ha habilitado la configuración, le avisaremos cuando esté lista')
      } else {
        let elementIndex = this.cloudConfigs.findIndex(cc => cc.id == id_cloud_integration);
        this.cloudConfigs[elementIndex] = {
          id: cloudConfig!.id,
          enabled: false,
          id_cloud_provider: cloudConfig!.id_cloud_provider,
          profile: cloudConfig!.profile,
          cloudProvider: cloudConfig?.cloudProvider
        }
        this.cloudConfigs = Object.assign([], this.cloudConfigs);
      }
    })
  }

}
