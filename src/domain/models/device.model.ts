import { DeviceTypeModel } from "./deviceType.model";

export interface DeviceModel {
  id: number;
  id_device_type: number;
  name: string;
  serial: string,
  deviceType?: DeviceTypeModel
}
