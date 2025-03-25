import type { Equipment } from '@/types/equipment';
import { getEquipment } from '@/api/getEquipment';
import { getEquipments } from '@/api/getEquipments';
import { atom } from 'jotai';

export const equipmentAtom = atom<Equipment | null>(null);
export const fetchEquipmentAtom = atom(null, async (_, set, id: string) => {
  const equipment = await getEquipment(id);
  set(equipmentAtom, equipment);
});

export const equipmentsAtom = atom<Equipment[]>([]);
export const fetchEquipmentsAtom = atom(null, async (_, set, {
  limit = 50,
  offset = 0,
  sort = 'createdAt',
  order = 'desc',
  search = '',
}) => {
  const equipments = await getEquipments(
    { limit, offset, sort, order, search },
  );
  set(equipmentsAtom, equipments.equipments);
});
