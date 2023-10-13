import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudProviderModel } from 'src/domain/models/cloudProvider.model';
import { CloudProviderRepository } from 'src/domain/repositories/cloudProvider.repository';
export class CloudProviderFindUseCase implements UseCase<{id: number}, CloudProviderModel> {
    constructor(private cloudProviderRepository: CloudProviderRepository) { }
    execute(
       params: {id: number},
    ): Observable<CloudProviderModel> {
        return this.cloudProviderRepository.find(params);
    }
}
