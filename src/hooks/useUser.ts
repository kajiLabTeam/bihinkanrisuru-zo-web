import { fetchUserAtom, userAtom } from '@/stores/user';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useUser(redirectPath: string) {
  const router = useNavigate();
  const userId = useParams<{ user_id: string }>().user_id;

  const user = useAtomValue(userAtom);
  const fetchUser = useSetAtom(fetchUserAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId == null) {
      void router(redirectPath);
      return;
    }

    void (async () => {
      try {
        setIsLoading(true);
        await fetchUser(userId);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [userId, fetchUser, router, redirectPath]);

  return { user, isLoading, error };
}
