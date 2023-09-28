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
        { provide: DeviceRepository, useClass: DeviceImplementationRepository },
        { provide: DeviceTypeRepository, useClass: DeviceTypeImplementationRepository },
        { provide: DeviceConfigRepository, useClass: DeviceConfigImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }
