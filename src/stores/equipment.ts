import type { Equipment } from '@/types/equipment';
import { getEquipment } from '@/api/getEquipment';
import { atom } from 'jotai';

export const equipmentAtom = atom<Equipment | null>(null);
export const fetchEquipmentAtom = atom(null, async (_, set, id: string) => {
  const equipment = await getEquipment(id);
  set(equipmentAtom, equipment);
});
