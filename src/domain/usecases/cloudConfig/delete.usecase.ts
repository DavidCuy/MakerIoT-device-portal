import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudConfigModel } from '../../models/cloudConfig.model';
import { CloudConfigRepository } from '../../repositories/cloudConfig.repository';
export class CloudConfigDeleteUseCase implements UseCase<{id: number}, CloudConfigModel | null> {
    constructor(private cloudConfigRepository: CloudConfigRepository) { }
    execute(
       params: {id: number},
    ): Observable<null> {
        return this.cloudConfigRepository.delete(params);
    }
}
