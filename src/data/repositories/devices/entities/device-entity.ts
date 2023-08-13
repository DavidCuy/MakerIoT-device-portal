import { DeviceTypeEntity } from "./deviceType-entity";

export interface DeviceEntity {
  id: number;
  id_device_type: number;
  name: string;
  serial: string;
  deviceType?: DeviceTypeEntity;
}
