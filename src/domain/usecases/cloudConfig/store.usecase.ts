import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudConfigModel } from '../../models/cloudConfig.model';
import { CloudConfigRepository } from '../../repositories/cloudConfig.repository';
export class CloudConfigStoreUseCase implements UseCase<{id_cloud_provider: number, profile: string, enabled: boolean}, CloudConfigModel> {
    constructor(private cloudConfigRepository: CloudConfigRepository) { }
    execute(
       params: {id_cloud_provider: number, profile: string, enabled: boolean},
    ): Observable<CloudConfigModel> {
        return this.cloudConfigRepository.store(params);
    }
}
