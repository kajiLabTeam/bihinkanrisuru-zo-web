import type { GetTagsResponse } from '@/types/tag';
import { BACKEND_URL } from '@/constants';
import { TagApiError } from './errors/tag';

export async function getTags(
  { name = '', limit = 50, offset = 0, sort = 'createdAt', order = 'desc' },
): Promise<GetTagsResponse> {
  try {
    const params = new URLSearchParams({ name, limit: `${limit}`, offset: `${offset}`, sort, order });
    const response = await fetch(`${BACKEND_URL}/tags?${params}`);

    if (!response.ok) {
      throw new TagApiError(response.status === 500 ? 'InternalServerError' : 'UnexpectedError');
    }

    return await response.json();
  }
  catch (err) {
    throw err instanceof TagApiError ? err : new TagApiError('FetchApiError');
  }
}
