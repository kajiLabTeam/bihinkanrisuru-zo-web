import type { EquipmentStatus } from './equipment';
import type { Tag } from './tag';
import type { UserStatus } from './user';

export interface EditEquipmentForm {
  assetId: string;
  name: string;
  status: EquipmentStatus;
  place: string;
  purchaseAt: number;
  tags: Tag[];
}

export interface CreateUserForm {
  id: string;
  name: string;
}

export interface EditUserForm {
  id: string;
  name: string;
  status: UserStatus;
}
