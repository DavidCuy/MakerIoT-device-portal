import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DeviceRepository } from 'src/domain/repositories/device.repository';
import { DeviceIndexUseCase } from 'src/domain/usecases/device/index.usecase';
import { DeviceStoreUseCase } from 'src/domain/usecases/device/store.usecase';
import { DeviceFindUseCase } from 'src/domain/usecases/device/find.usecase';
import { DeviceDeleteUseCase } from 'src/domain/usecases/device/delete.usecase';
import { DeviceImplementationRepository } from './repositories/devices/device-implementation.repository';

import { DeviceTypeRepository } from 'src/domain/repositories/deviceType.repository';
import { DeviceTypeIndexUseCase } from 'src/domain/usecases/deviceType/index.usecase';
import { DeviceTypeStoreUseCase } from 'src/domain/usecases/deviceType/store.usecase';
import { DeviceTypeFindUseCase } from 'src/domain/usecases/deviceType/find.usecase';
import { DeviceTypeImplementationRepository } from './repositories/devices/deviceType-implementation.repository';

import { DeviceConfigRepository } from 'src/domain/repositories/deviceConfig.repository';
import { DeviceConfigListByDeviceIdUseCase } from 'src/domain/usecases/deviceConfig/listByDeviceId.usecase';
import { DeviceConfigStoreUseCase } from 'src/domain/usecases/deviceConfig/store.usecase';
import { DeviceConfigUpdateUseCase } from 'src/domain/usecases/deviceConfig/update.usecase';
import { DeviceConfigDeleteUseCase } from 'src/domain/usecases/deviceConfig/delete.usecase';
import { DeviceConfigImplementationRepository } from './repositories/devices/deviceConfig-implementation.repository';

import { CloudProviderRepository } from 'src/domain/repositories/cloudProvider.repository';
import { CloudProviderIndexUseCase } from 'src/domain/usecases/cloudProvider/index.usecase';
import { CloudProviderFindUseCase } from 'src/domain/usecases/cloudProvider/find.usecase';
import { CloudProviderImplementationRepository } from './repositories/cloud-sync/cloudProvider-implementation.repository';

import { CloudConfigRepository } from 'src/domain/repositories/cloudConfig.repository';
import { CloudConfigIndexUseCase } from 'src/domain/usecases/cloudConfig/index.usecase';
import { CloudConfigStoreUseCase } from 'src/domain/usecases/cloudConfig/store.usecase';
import { CloudConfigFindUseCase } from 'src/domain/usecases/cloudConfig/find.usecase';
import { CloudConfigDeleteUseCase } from 'src/domain/usecases/cloudConfig/delete.usecase';
import { CloudConfigImplementationRepository } from './repositories/cloud-sync/cloudConfig-implementation.repository';


const deviceIndexUseCaseFactory =
(deviceRepo: DeviceRepository) => new DeviceIndexUseCase(deviceRepo);
export const deviceIndexUseCaseProvider = {
    provide: DeviceIndexUseCase,
    useFactory: deviceIndexUseCaseFactory,
    deps: [DeviceRepository],
};
const deviceStoreUseCaseFactory =
(deviceRepo: DeviceRepository) => new DeviceStoreUseCase(deviceRepo);
export const deviceStoreUseCaseProvider = {
    provide: DeviceStoreUseCase,
    useFactory: deviceStoreUseCaseFactory,
    deps: [DeviceRepository],
};
const deviceFindUseCaseFactory =
(deviceRepo: DeviceRepository) => new DeviceFindUseCase(deviceRepo);
export const deviceFindUseCaseProvider = {
    provide: DeviceFindUseCase,
    useFactory: deviceFindUseCaseFactory,
    deps: [DeviceRepository],
};
const deviceDeleteUseCaseFactory =
(deviceRepo: DeviceRepository) => new DeviceDeleteUseCase(deviceRepo);
export const deviceDeleteUseCaseProvider = {
    provide: DeviceDeleteUseCase,
    useFactory: deviceDeleteUseCaseFactory,
    deps: [DeviceRepository],
};

const deviceTypeIndexUseCaseFactory =
(deviceTypeRepo: DeviceTypeRepository) => new DeviceTypeIndexUseCase(deviceTypeRepo);
export const deviceTypeIndexUseCaseProvider = {
    provide: DeviceTypeIndexUseCase,
    useFactory: deviceTypeIndexUseCaseFactory,
    deps: [DeviceTypeRepository],
};
const deviceTypeStoreUseCaseFactory =
(deviceTypeRepo: DeviceTypeRepository) => new DeviceTypeStoreUseCase(deviceTypeRepo);
export const deviceTypeStoreUseCaseProvider = {
    provide: DeviceTypeStoreUseCase,
    useFactory: deviceTypeStoreUseCaseFactory,
    deps: [DeviceTypeRepository],
};
const deviceTypeFindUseCaseFactory =
(deviceTypeRepo: DeviceTypeRepository) => new DeviceTypeFindUseCase(deviceTypeRepo);
export const deviceTypeFindUseCaseProvider = {
    provide: DeviceTypeFindUseCase,
    useFactory: deviceTypeFindUseCaseFactory,
    deps: [DeviceTypeRepository],
};




const deviceConfigListByDeviceIdUseCaseFactory =
(deviceConfigRepo: DeviceConfigRepository) => new DeviceConfigListByDeviceIdUseCase(deviceConfigRepo);
export const deviceConfigListByDeviceIdUseCaseProvider = {
    provide: DeviceConfigListByDeviceIdUseCase,
    useFactory: deviceConfigListByDeviceIdUseCaseFactory,
    deps: [DeviceConfigRepository],
};
const deviceConfigStoreUseCaseFactory =
(deviceConfigRepo: DeviceConfigRepository) => new DeviceConfigStoreUseCase(deviceConfigRepo);
export const deviceConfigStoreUseCaseProvider = {
    provide: DeviceConfigStoreUseCase,
    useFactory: deviceConfigStoreUseCaseFactory,
    deps: [DeviceConfigRepository],
};
const deviceConfigUpdateUseCaseFactory =
(deviceConfigRepo: DeviceConfigRepository) => new DeviceConfigUpdateUseCase(deviceConfigRepo);
export const deviceConfigUpdateUseCaseProvider = {
    provide: DeviceConfigUpdateUseCase,
    useFactory: deviceConfigUpdateUseCaseFactory,
    deps: [DeviceConfigRepository],
};
const deviceConfigDeleteUseCaseFactory =
(deviceConfigRepo: DeviceConfigRepository) => new DeviceConfigDeleteUseCase(deviceConfigRepo);
export const deviceConfigDeleteUseCaseProvider = {
    provide: DeviceConfigDeleteUseCase,
    useFactory: deviceConfigDeleteUseCaseFactory,
    deps: [DeviceConfigRepository],
};




const cloudProviderIndexUseCaseFactory =
(cloudProviderRepo: CloudProviderRepository) => new CloudProviderIndexUseCase(cloudProviderRepo);
export const cloudProviderIndexUseCaseProvider = {
    provide: CloudProviderIndexUseCase,
    useFactory: cloudProviderIndexUseCaseFactory,
    deps: [CloudProviderRepository],
};
const cloudProviderFindUseCaseFactory =
(cloudProviderRepo: CloudProviderRepository) => new CloudProviderFindUseCase(cloudProviderRepo);
export const cloudProviderFindUseCaseProvider = {
    provide: CloudProviderFindUseCase,
    useFactory: cloudProviderFindUseCaseFactory,
    deps: [CloudProviderRepository],
};



const cloudConfigIndexUseCaseFactory =
(cloudConfigRepo: CloudConfigRepository) => new CloudConfigIndexUseCase(cloudConfigRepo);
export const cloudConfigIndexUseCaseProvider = {
    provide: CloudConfigIndexUseCase,
    useFactory: cloudConfigIndexUseCaseFactory,
    deps: [CloudConfigRepository],
};
const cloudConfigFindUseCaseFactory =
(cloudConfigRepo: CloudConfigRepository) => new CloudConfigFindUseCase(cloudConfigRepo);
export const cloudConfigStoreUseCaseProvider = {
    provide: CloudConfigFindUseCase,
    useFactory: cloudConfigFindUseCaseFactory,
    deps: [CloudConfigRepository],
};
const cloudConfigStoreUseCaseFactory =
(cloudConfigRepo: CloudConfigRepository) => new CloudConfigFindUseCase(cloudConfigRepo);
export const cloudConfigFindUseCaseProvider = {
    provide: CloudConfigFindUseCase,
    useFactory: cloudConfigStoreUseCaseFactory,
    deps: [CloudConfigRepository],
};
const cloudConfigDeleteUseCaseFactory =
(cloudConfigRepo: CloudConfigRepository) => new CloudConfigDeleteUseCase(cloudConfigRepo);
export const cloudConfigDeleteUseCaseProvider = {
    provide: CloudConfigDeleteUseCase,
    useFactory: cloudConfigDeleteUseCaseFactory,
    deps: [CloudConfigRepository],
};


@NgModule({
    providers: [
        deviceIndexUseCaseProvider,
        deviceStoreUseCaseProvider,
        deviceFindUseCaseProvider,
        deviceDeleteUseCaseProvider,
        deviceTypeFindUseCaseProvider,
        deviceTypeIndexUseCaseProvider,
        deviceTypeStoreUseCaseProvider,
        deviceConfigListByDeviceIdUseCaseProvider,
        deviceConfigStoreUseCaseProvider,
        deviceConfigUpdateUseCaseProvider,
        deviceConfigDeleteUseCaseProvider,
        cloudProviderFindUseCaseProvider,
        cloudProviderIndexUseCaseProvider,
        cloudConfigIndexUseCaseProvider,
        cloudConfigStoreUseCaseProvider,
        cloudConfigFindUseCaseProvider,
        cloudConfigDeleteUseCaseProvider,
        { provide: DeviceRepository, useClass: DeviceImplementationRepository },
        { provide: DeviceTypeRepository, useClass: DeviceTypeImplementationRepository },
        { provide: DeviceConfigRepository, useClass: DeviceConfigImplementationRepository },
        { provide: CloudConfigRepository, useClass: CloudConfigImplementationRepository },
        { provide: CloudProviderRepository, useClass: CloudProviderImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }
