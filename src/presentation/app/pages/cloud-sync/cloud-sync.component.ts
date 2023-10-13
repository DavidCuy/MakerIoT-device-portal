import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CloudProviderIndexUseCase } from 'src/domain/usecases/cloudProvider/index.usecase';
import { CloudConfigIndexUseCase } from 'src/domain/usecases/cloudConfig/index.usecase';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { CloudConfigModel } from 'src/domain/models/cloudConfig.model';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';

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

}
