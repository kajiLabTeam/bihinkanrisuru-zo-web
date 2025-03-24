import type { StatusMessageResponse } from '@/types/http';
import type { EquipmentApiErrorType } from './errors/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function returnEquipment(id: string): Promise<StatusMessageResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/equipments/${id}/return`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMap: Record<number, EquipmentApiErrorType> = {
        400: 'BadRequestError',
        404: 'NotFoundError',
        422: 'ReturnUnprocessableEntityError',
        500: 'InternalServerError',
      };
      throw new EquipmentApiError(errorMap[response.status]);
    }

    return await response.json();
  }
  catch (err) {
    throw err instanceof EquipmentApiError ? err : new EquipmentApiError('FetchApiError');
  }
}
