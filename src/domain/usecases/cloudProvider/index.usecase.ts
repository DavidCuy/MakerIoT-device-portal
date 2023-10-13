import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudProviderModel } from '../../models/cloudProvider.model';
import { CloudProviderRepository } from '../../repositories/cloudProvider.repository';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
export class CloudProviderIndexUseCase implements UseCase<{
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }, IndexEntity<CloudProviderModel>> {
    constructor(private cloudProviderRepository: CloudProviderRepository) { }
    execute(
       params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {page:1, perPage:10, filterByColum: [], searchByColumn: [], relationships: []},
    ): Observable<IndexEntity<CloudProviderModel>> {
        return this.cloudProviderRepository.index(params);
    }
}
