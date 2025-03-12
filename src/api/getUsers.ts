import type { GetUsersResponse } from '@/types/user';
import { BACKEND_URL } from '@/constants';
import { GetUsersError } from './errors';

export async function getUsers(name = '', limit = 50, offset = 0, sort = 'createdAt', order = 'desc'): Promise<GetUsersResponse> {
  try {
    const params = new URLSearchParams({
      name,
      limit: limit.toString(),
      offset: offset.toString(),
      sort,
      order,
    });
    const response = await fetch(`${BACKEND_URL}/users?${params}`);

    if (response.status === 500) {
      throw new GetUsersError(
        'InternalServerError',
      );
    }

    return await response.json();
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      throw new GetUsersError('FetchApiError');
    }
    throw new GetUsersError(
      'UnexpectedError',
    );
  }
}
