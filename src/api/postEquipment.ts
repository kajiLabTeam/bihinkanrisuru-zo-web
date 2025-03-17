import type { PostEquipmentRequest, PostEquipmentResponse } from '@/types/equipment';
import type { EquipmentApiErrorType } from './errors/equipment';
import { BACKEND_URL } from '@/constants';
import { EquipmentApiError } from './errors/equipment';

export async function postEquipment(createData: PostEquipmentRequest): Promise<PostEquipmentResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/equipments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
    });

    if (!response.ok) {
      const errorMap: Record<number, EquipmentApiErrorType> = {
        400: 'BadRequestError',
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
