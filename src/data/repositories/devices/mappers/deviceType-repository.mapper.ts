import { Mapper } from 'src/base/mapper';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { DeviceTypeEntity } from '../entities/deviceType-entity';
import { IndexEntity } from '../entities/index-entity';


export class DeviceTypeImplementationRepositoryMapper extends Mapper<DeviceTypeEntity | IndexEntity, DeviceTypeModel> {
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

    mapMultipleFrom(params: IndexEntity): DeviceTypeModel[] {
        return params.Data.map((param) => {
            return {
                id: param.id,
                name: param.name
              }
        })
    }
}
