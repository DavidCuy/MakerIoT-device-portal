import { CloudProviderModel } from "./cloudProvider.model";
export interface CloudConfigModel {
    id: number;
    id_cloud_provider: number;
    profile: string;
    enabled: boolean;
    cloudProvider?: CloudProviderModel
}