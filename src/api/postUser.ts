import type { PostUserRequest, PostUserResponse } from '@/types/user';
import type { UserApiErrorType } from './errors/user';
import { BACKEND_URL } from '@/constants';
import { UserApiError } from './errors/user';

export async function postUser(createData: PostUserRequest): Promise<PostUserResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
    });

    if (!response.ok) {
      const errorMap: Record<number, UserApiErrorType> = {
        400: 'BadRequestError',
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
