import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { DeviceModel } from '../../models/device.model';
import { DeviceRepository } from '../../repositories/device.repository';
export class DeviceIndexUseCase implements UseCase<{
    page?: number,
    perPage?: number,
    filterByColum?: {name: string, value: string | number | boolean}[],
    searchByColumn?: {name: string, value: string | number | boolean}[]
}, DeviceModel[]> {
    constructor(private deviceRepository: DeviceRepository) { }
    execute(
       params: {
        page?: number,
        perPage?: number,
        filterByColum?: {name: string, value: string | number | boolean}[],
        searchByColumn?: {name: string, value: string | number | boolean}[]
    } = {page:1, perPage:10, filterByColum: [], searchByColumn: []},
    ): Observable<DeviceModel[]> {
        return this.deviceRepository.index(params);
    }
}
