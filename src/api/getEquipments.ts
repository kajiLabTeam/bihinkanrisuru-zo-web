import type { GetEquipmentsResponse } from '@/types/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function getEquipments(
  name = '',
  limit = 50,
  offset = 0,
  sort = 'createdAt',
  order = 'desc',
): Promise<GetEquipmentsResponse> {
  try {
    const params = new URLSearchParams({ name, limit: `${limit}`, offset: `${offset}`, sort, order });
    const response = await fetch(`${BACKEND_URL}/equipments?${params}`);

    if (!response.ok) {
      throw new EquipmentApiError(response.status === 500 ? 'InternalServerError' : 'UnexpectedError');
    }

    return await response.json();
  }
  catch (err) {
    throw err instanceof EquipmentApiError ? err : new EquipmentApiError('FetchApiError');
  }
}
