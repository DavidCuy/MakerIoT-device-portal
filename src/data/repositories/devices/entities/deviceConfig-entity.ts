export interface DeviceConfigEntity {
  _id: string;
  name: string;
  device_id: number;
  input_topic: string;
  input_json: any;
  output_json: any;
  output_topic: string;
  created_at: string;
  updated_at: string;
}
