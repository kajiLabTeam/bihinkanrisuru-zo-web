import type { User } from '@/types/user';
import { getUser } from '@/api/getUser';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);
export const fetchUserAtom = atom(null, async (_, set, id: string) => {
  const user = await getUser(id);
  set(userAtom, user);
});
