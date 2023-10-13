import { Mapper } from 'src/base/mapper';
import { CloudProviderEntity } from '../entities/cloudProvider-entity';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { IndexEntity } from '../../index/entitites/index-entity';

//Mapper<DeviceTypeEntity | IndexEntity<DeviceTypeModel>, DeviceTypeModel | IndexEntity<DeviceTypeModel>>
export class CloudProviderRepositoryMapper extends Mapper<CloudProviderEntity | IndexEntity<CloudProviderModel>, CloudProviderModel | IndexEntity<CloudProviderModel>> {
    mapFrom(param: CloudProviderEntity): CloudProviderModel {
        return {
            id: param.id,
            name: param.name,
            key: param.key
        };
    }
    mapTo(param: CloudProviderModel): CloudProviderEntity {
        return {
            id: param.id,
            name: param.name,
            key: param.key
        }
    }

    mapMultipleFrom(params: IndexEntity<CloudProviderModel>): IndexEntity<CloudProviderEntity> {
        return {
            Limit: params.Limit,
            Links: params.Links,
            Offset: params.Offset,
            Total: params.Total,
            Data: params.Data.map((param) => {
                return {
                    id: param.id,
                    name: param.name,
                    key: param.key
                }
            })
        }
    }
}
