import type { User } from '@/types/user';
import { getUsers } from '@/api/getUsers';
import { useEffect, useState } from 'react';

export function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await getUsers();

        setUsers(response.users);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    }

    void fetchUser();
  }, []);

  return { users, error, isLoading };
}
