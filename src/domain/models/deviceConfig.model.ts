import { InputDict } from "src/base/inputDict";
export interface DeviceConfigModel {
  _id: string;
  name: string;
  device_id: number;
  input_topic: string;
  input_json: InputDict;
  output_json: InputDict;
  output_topic: string;
  created_at: string;
  updated_at: string;
}
