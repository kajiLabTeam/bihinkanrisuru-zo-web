import type { Tag } from '@/types/tag';

import { getTags } from '@/api/getTags';
import { atom } from 'jotai';

export const tagsAtom = atom<Tag[]>([]);
export const fetchTagsAtom = atom(null, async (_, set, {
  name = '',
  limit = 50,
  offset = 0,
  sort = 'createdAt',
  order = 'desc',
}) => {
  const tags = await getTags(
    { name, limit, offset, sort, order },
  );
  set(tagsAtom, tags.tags);
});
