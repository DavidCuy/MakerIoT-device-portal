import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudConfigModel } from '../../models/cloudConfig.model';
import { CloudConfigRepository } from '../../repositories/cloudConfig.repository';
export class CloudConfigFindUseCase implements UseCase<{id: number}, CloudConfigModel> {
    constructor(private cloudConfigRepository: CloudConfigRepository) { }
    execute(
       params: {id: number},
    ): Observable<CloudConfigModel> {
        return this.cloudConfigRepository.find(params);
    }
}
