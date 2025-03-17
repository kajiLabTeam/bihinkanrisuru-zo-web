import type { GetEquipmentResponse } from '@/types/equipment';

import type { EquipmentApiErrorType } from './errors/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function getEquipment(id: string): Promise<GetEquipmentResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/equipments/${id}`);

    if (!response.ok) {
      const errorMap: Record<number, EquipmentApiErrorType> = {
        404: 'NotFoundError',
        500: 'InternalServerError',
      };
      throw new EquipmentApiError(errorMap[response.status] || 'UnexpectedError');
    }

    return await response.json();
  }
  catch {
    throw new EquipmentApiError('FetchApiError');
  }
}
