import { Mapper } from 'src/base/mapper';
import { DeviceTypeModel } from 'src/domain/models/deviceType.model';
import { DeviceTypeEntity } from '../entities/deviceType-entity';
import { IndexEntity } from '../../index/entitites/index-entity';


export class DeviceTypeImplementationRepositoryMapper extends Mapper<DeviceTypeEntity | IndexEntity<DeviceTypeModel>, DeviceTypeModel | IndexEntity<DeviceTypeModel>> {
    mapFrom(param: DeviceTypeEntity): DeviceTypeModel {
        return {
            id: param.id,
            name: param.name,
            enabled_config: param.enabled_config
        };
    }
    mapTo(param: DeviceTypeModel): DeviceTypeModel {
        return {
          id: param.id,
          name: param.name,
          enabled_config: param.enabled_config
        }
    }

    mapMultipleFrom(params: IndexEntity<DeviceTypeModel>): IndexEntity<DeviceTypeModel> {
        return {
            Limit: params.Limit,
            Links: params.Links,
            Offset: params.Offset,
            Total: params.Total,
            Data: params.Data.map((param) => {
                return {
                    id: param.id,
                    name: param.name,
                    enabled_config: param.enabled_config
                  }
            })
        }
    }
}
