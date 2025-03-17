import type { EquipmentStatus } from './equipment';
import type { Tag } from './tag';

export interface EditEquipmentForm {
  assetId: string;
  name: string;
  status: EquipmentStatus;
  place: string;
  purchaseAt: number;
  tags: Tag[];
}
