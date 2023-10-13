import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { CloudConfigModel } from '../../models/cloudConfig.model';
import { CloudConfigRepository } from '../../repositories/cloudConfig.repository';
import { IndexEntity } from 'src/data/repositories/index/entitites/index-entity';
export class CloudConfigIndexUseCase implements UseCase<{
    page?: number,
    perPage?: number,
    filterByColum?: {name: string, value: string | number | boolean}[],
    searchByColumn?: {name: string, value: string | number | boolean}[],
    relationships: string[]
}, IndexEntity<CloudConfigModel>> {
    constructor(private cloudConfigRepository: CloudConfigRepository) { }
    execute(
       params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {page:1, perPage:10, filterByColum: [], searchByColumn: [], relationships: []},
    ): Observable<IndexEntity<CloudConfigModel>> {
        return this.cloudConfigRepository.index(params);
    }
}
