import type { GetUserResponse } from '@/types/user';
import type { UserApiErrorType } from './errors/user';
import { BACKEND_URL } from '@/constants';
import { UserApiError } from './errors/user';

export async function getUser(id: string): Promise<GetUserResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`);

    if (!response.ok) {
      const errorMap: Record<number, UserApiErrorType> = {
        404: 'NotFoundError',
        500: 'InternalServerError',
      };
      throw new UserApiError(errorMap[response.status] || 'UnexpectedError');
    }

    return await response.json();
  }
  catch (err) {
    throw err instanceof UserApiError ? err : new UserApiError('FetchApiError');
  }
}
