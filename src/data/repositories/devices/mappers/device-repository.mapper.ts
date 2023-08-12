import { Mapper } from 'src/base/mapper';
import { DeviceModel } from 'src/domain/models/device.model';
import { DeviceEntity } from '../entities/device-entity';


export class DeviceImplementationRepositoryMapper extends Mapper<DeviceEntity, DeviceModel> {
    mapFrom(param: DeviceEntity): DeviceModel {
        return {
            id: param.id,
            idDeviceType: param.idDeviceType,
            name: param.name,
            serial: param.serial
        };
    }
    mapTo(param: DeviceModel): DeviceEntity {
        return {
          id: param.id,
          idDeviceType: param.idDeviceType,
          name: param.name,
          serial: param.serial
        }
    }
}
