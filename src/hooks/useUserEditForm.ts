import type { EditUserForm } from '@/types/form';
import type { PutUserRequest } from '@/types/user';
import type { SubmitHandler } from 'react-hook-form';
import { putUser } from '@/api/putUser';
import { ERROR_REDIRECT_DELAY } from '@/constants';
import { fetchUserAtom, userAtom } from '@/stores/user';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { useToast } from './useToast';

export function useUserEditForm() {
  const router = useNavigate();
  const { isOpen, color, message, onOpen, onClose } = useToast();
  const userId = useParams<{ user_id: string }>().user_id;

  const user = useAtomValue(userAtom);
  const fetchUser = useSetAtom(fetchUserAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleError = useCallback((err: unknown) => {
    flushSync(() => {
      onOpen(err instanceof Error ? err.message : 'エラーが発生しました', 'red');
    });

    setTimeout(() => {
      void router('/admin/users');
    }, ERROR_REDIRECT_DELAY);
  }, [onOpen, router]);

  const handleSuccess = (message: string) => {
    flushSync(() => {
      onOpen(message, 'green');
    });

    setTimeout(() => {
      void router('/admin/users');
    }, ERROR_REDIRECT_DELAY);
  };

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
      handleSuccess('ユーザの更新が完了しました');
    }
    catch (err) {
      handleError(err);
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
        handleError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [userId, fetchUser, handleError]);

  return { isOpen, color, message, user, isLoading, onClose, onSubmit };
}
