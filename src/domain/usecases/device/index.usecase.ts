import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceModel } from '../../models/device.model';
import { DeviceRepository } from '../../repositories/device.repository';
import { IndexEntity } from 'src/data/repositories/devices/entities/index-entity';
export class DeviceIndexUseCase implements UseCase<{
    page?: number,
    perPage?: number,
    filterByColum?: {name: string, value: string | number | boolean}[],
    searchByColumn?: {name: string, value: string | number | boolean}[],
    relationships: string[]
}, IndexEntity<DeviceModel>> {
    constructor(private deviceRepository: DeviceRepository) { }
    execute(
       params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {page:1, perPage:10, filterByColum: [], searchByColumn: [], relationships: []},
    ): Observable<IndexEntity<DeviceModel>> {
        return this.deviceRepository.index(params);
    }
}
