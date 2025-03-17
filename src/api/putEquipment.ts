import type { PutEquipmentRequest, PutEquipmentResponse } from '@/types/equipment';
import type { EquipmentApiErrorType } from './errors/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function putEquipment(id: string, updateData: PutEquipmentRequest): Promise<PutEquipmentResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/equipments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorMap: Record<number, EquipmentApiErrorType> = {
        400: 'BadRequestError',
        404: 'NotFoundError',
        500: 'InternalServerError',
      };
      throw new EquipmentApiError(errorMap[response.status]);
    }

    return await response.json();
  }
  catch {
    throw new EquipmentApiError('FetchApiError');
  }
}
