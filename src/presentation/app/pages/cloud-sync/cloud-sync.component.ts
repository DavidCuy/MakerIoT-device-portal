import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CloudProviderIndexUseCase } from 'src/domain/usecases/cloudProvider/index.usecase';
import { CloudConfigIndexUseCase } from 'src/domain/usecases/cloudConfig/index.usecase';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { CloudConfigModel } from 'src/domain/models/cloudConfig.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
import Swal from 'sweetalert2';

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
      html:
        `<label for="swal2-input-profile" class="swal2-input-label">Nombre del perfil de configuracion</label>
        <input id="swal2-input-profile" class="swal2-input" onkeypress="document.getElementById('swal2-aws-validation-message').style.display = 'none'">
        
        <label for="swal2-input-aws-account-id" class="swal2-input-label">Cuenta de AWS</label>
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
        let profile = (<HTMLInputElement>document.getElementById('swal2-input-profile'))?.value;
        let access_key_id = (<HTMLInputElement>document.getElementById('swal2-input-aws-access-key-id'))?.value;
        let access_key_secret = (<HTMLInputElement>document.getElementById('swal2-input-aws-access-key-secret'))?.value;

        if (!profile || !access_key_id || !access_key_secret) {
          document.getElementById('swal2-aws-validation-message')!.style.display = 'flex';
          return false
        }

        return {
          'profile': profile,
          'id_cloud_provider': provider_id,
          'provider': 'aws',
          'account_id': access_key_id,
          'save_config': access_key_id,
          'aws_access_key_id': access_key_id,
          'aws_secret_access_key': access_key_secret,
        }
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      console.log(result)
      if (result.isConfirmed) {
        this.cloudProviderIndexUsecase.execute().subscribe(() => {
          console.log(provider_id)
          console.log(result.value)
        })
      }
    })
  }

}
