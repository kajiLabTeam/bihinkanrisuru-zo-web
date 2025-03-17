import type { GetEquipmentResponse } from '@/types/equipment';

import type { EquipmentApiErrorType } from './errors/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function getEquipmentStatus(): Promise<GetEquipmentResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/equipments/status`);

    if (!response.ok) {
      const errorMap: Record<number, EquipmentApiErrorType> = {
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
