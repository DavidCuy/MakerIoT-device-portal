import { Mapper } from 'src/base/mapper';
import { CloudConfigEntity } from '../entities/cloudConfig-entity';
import { CloudConfigModel } from 'src/domain/models/cloudConfig.model';
import { IndexEntity } from '../../index/entitites/index-entity';


export class CloudConfigRepositoryMapper extends Mapper<CloudConfigEntity | IndexEntity<CloudConfigModel>, CloudConfigModel | IndexEntity<CloudConfigModel>> {
    mapFrom(param: CloudConfigEntity): CloudConfigModel {
        return {
            id: param.id,
            id_cloud_provider: param.id_cloud_provider,
            profile: param.profile,
            enabled: param.enabled,
            cloudProvider: param.cloudProvider
        };
    }
    mapTo(param: CloudConfigModel): CloudConfigEntity {
        return {
            id: param.id,
            id_cloud_provider: param.id_cloud_provider,
            profile: param.profile,
            enabled: param.enabled,
            cloudProvider: param.cloudProvider
        }
    }

    mapMultipleFrom(params: IndexEntity<CloudConfigModel>): IndexEntity<CloudConfigEntity> {
        return {
            Limit: params.Limit,
            Links: params.Links,
            Offset: params.Offset,
            Total: params.Total,
            Data: params.Data.map((param) => {
                return {
                    id: param.id,
                    id_cloud_provider: param.id_cloud_provider,
                    profile: param.profile,
                    enabled: param.enabled,
                    cloudProvider: param.cloudProvider
                }
            })
        }
    }
}
