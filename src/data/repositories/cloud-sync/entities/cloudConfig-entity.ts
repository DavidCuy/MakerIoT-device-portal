import { CloudProviderEntity } from "./cloudProvider-entity";
export interface CloudConfigEntity {
    id: number;
    id_cloud_provider: number;
    profile: string;
    enabled: boolean;
    cloudProvider?: CloudProviderEntity
}