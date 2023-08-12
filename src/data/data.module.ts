import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DeviceRepository } from 'src/domain/repositories/device.repository';
import { DeviceIndexUseCase } from 'src/domain/usecases/device/index.usecase';
import { DeviceStoreUseCase } from 'src/domain/usecases/device/store.usecase';
import { DeviceFindUseCase } from 'src/domain/usecases/device/find.usecase';
import { DeviceImplementationRepository } from './repositories/devices/device-implementation.repository';

import { DeviceTypeRepository } from 'src/domain/repositories/deviceType.repository';
import { DeviceTypeIndexUseCase } from 'src/domain/usecases/deviceType/index.usecase';
import { DeviceTypeStoreUseCase } from 'src/domain/usecases/deviceType/store.usecase';
import { DeviceTypeFindUseCase } from 'src/domain/usecases/deviceType/find.usecase';
import { DeviceTypeImplementationRepository } from './repositories/devices/deviceType-implementation.repository';

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



@NgModule({
    providers: [
        deviceIndexUseCaseProvider,
        deviceStoreUseCaseProvider,
        deviceFindUseCaseProvider,
        deviceTypeFindUseCaseProvider,
        deviceTypeIndexUseCaseProvider,
        deviceTypeStoreUseCaseProvider,
        { provide: DeviceRepository, useClass: DeviceImplementationRepository },
        { provide: DeviceTypeRepository, useClass: DeviceTypeImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }
