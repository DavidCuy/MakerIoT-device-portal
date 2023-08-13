import { Mapper } from 'src/base/mapper';
import { DeviceModel } from 'src/domain/models/device.model';
import { DeviceEntity } from '../entities/device-entity';
import { IndexEntity } from '../entities/index-entity';


export class DeviceImplementationRepositoryMapper extends Mapper<DeviceEntity | IndexEntity, DeviceModel> {
    mapFrom(param: DeviceEntity): DeviceModel {
        return {
            id: param.id,
            id_device_type: param.id_device_type,
            name: param.name,
            serial: param.serial,
            deviceType: param.deviceType
        };
    }
    mapTo(param: DeviceModel): DeviceEntity {
        return {
          id: param.id,
          id_device_type: param.id_device_type,
          name: param.name,
          serial: param.serial,
          deviceType: param.deviceType
        }
    }

    mapMultipleFrom(params: IndexEntity): DeviceModel[] {
        return params.Data.map((param) => {
            return {
                id: param.id,
                id_device_type: param.id_device_type,
                name: param.name,
                serial: param.serial,
                deviceType: param.deviceType
              }
        })
    }
}
