import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceTypeModel } from '../../models/deviceType.model';
import { DeviceTypeRepository } from '../../repositories/deviceType.repository';
export class DeviceTypeIndexUseCase implements UseCase<{
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    }, DeviceTypeModel[]> {
    constructor(private deviceTypeRepository: DeviceTypeRepository) { }
    execute(
       params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[],
        relationships: string[]
    } = {page:1, perPage:10, filterByColum: [], searchByColumn: [], relationships: []},
    ): Observable<DeviceTypeModel[]> {
        return this.deviceTypeRepository.index(params);
    }
}
