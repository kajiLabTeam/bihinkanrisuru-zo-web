import type { GetUsersResponse } from '@/types/user';
import { BACKEND_URL } from '@/constants';
import { UserApiError } from './errors/user';

export async function getUsers(
  name = '',
  limit = 50,
  offset = 0,
  sort = 'createdAt',
  order = 'desc',
): Promise<GetUsersResponse> {
  try {
    const params = new URLSearchParams({ name, limit: `${limit}`, offset: `${offset}`, sort, order });
    const response = await fetch(`${BACKEND_URL}/users?${params}`);

    if (!response.ok) {
      throw new UserApiError(response.status === 500 ? 'InternalServerError' : 'UnexpectedError');
    }

    return await response.json();
  }
  catch {
    throw new UserApiError('FetchApiError');
  }
}
