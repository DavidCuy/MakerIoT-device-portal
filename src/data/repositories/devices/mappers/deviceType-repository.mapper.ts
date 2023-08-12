import { Mapper } from 'src/base/mapper';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { DeviceTypeEntity } from '../entities/deviceType-entity';


export class DeviceTypeImplementationRepositoryMapper extends Mapper<DeviceTypeEntity, DeviceTypeModel> {
    mapFrom(param: DeviceTypeEntity): DeviceTypeModel {
        return {
            id: param.id,
            name: param.name
        };
    }
    mapTo(param: DeviceTypeModel): DeviceTypeEntity {
        return {
          id: param.id,
          name: param.name
        }
    }
}
