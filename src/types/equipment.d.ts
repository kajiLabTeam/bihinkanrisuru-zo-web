import type { EquipmentStatus as EquipmentStatusValue } from '@/constants';

export interface Equipment {
  id: string;
  asset_id: string;
  name: string;
  status: EquipmentStatus;
  place: string;
  registration_at: number;
  purchase_at: number;
  borrower?: User & { borrowed_at: number };
  tags: Tag[];
}

export interface GetEquipmentsResponse {
  equipments: Equipment[];
}

export interface PutEquipmentRequest {
  asset_id: string;
  name: string;
  status: string;
  place: string;
  purchase_at: number;
  tag_ids: string[];
}

export type EquipmentStatus = (typeof EquipmentStatusValue)[keyof typeof EquipmentStatusValue];
export type PutEquipmentResponse = Equipment;
export type GetEquipmentResponse = Equipment;
