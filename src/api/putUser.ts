import type { StatusMessageResponse } from '@/types/http';
import type { PutUserRequest } from '@/types/user';
import type { UserApiErrorType } from './errors/user';
import { BACKEND_URL } from '@/constants';
import { UserApiError } from './errors/user';

export async function putUser(id: string, updateData: PutUserRequest): Promise<StatusMessageResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorMap: Record<number, UserApiErrorType> = {
        400: 'BadRequestError',
        404: 'NotFoundError',
        500: 'InternalServerError',
      };
      throw new UserApiError(errorMap[response.status]);
    }

    return await response.json();
  }
  catch (err) {
    throw err instanceof UserApiError ? err : new UserApiError('FetchApiError');
  }
}
