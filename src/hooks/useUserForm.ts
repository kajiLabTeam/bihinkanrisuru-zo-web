import type { EditUserForm } from '@/types/form';
import type { PutUserRequest } from '@/types/user';
import type { SubmitHandler } from 'react-hook-form';
import { putUser } from '@/api/putUser';
import { fetchUserAtom, userAtom } from '@/stores/user';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useUserForm() {
  const router = useNavigate();
  const userId = useParams<{ user_id: string }>().user_id;

  const user = useAtomValue(userAtom);
  const fetchUser = useSetAtom(fetchUserAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<EditUserForm> = async (data): Promise<void> => {
    if (userId == null)
      return;

    try {
      setIsLoading(true);
      const updateData = {
        name: data.name,
        status: data.status,
      } satisfies PutUserRequest;

      await putUser(userId, updateData);

      void router('/admin/users');
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId == null) {
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
  }, [userId, fetchUser]);

  return { user, isLoading, error, onSubmit };
}
