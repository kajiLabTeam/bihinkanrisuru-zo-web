import type { CreateUserForm } from '@/types/form';
import type { PostUserRequest } from '@/types/user';
import type { SubmitHandler } from 'react-hook-form';
import { postUser } from '@/api/postUser';
import { ERROR_REDIRECT_DELAY } from '@/constants';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { useToast } from './useToast';

export function useRegisterUserForm() {
  const router = useNavigate();
  const { isOpen, color, message, onOpen, onClose } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useParams<{ user_id: string }>().user_id;

  const handleError = (err: unknown) => {
    flushSync(() => {
      onOpen(err instanceof Error ? err.message : 'エラーが発生しました', 'red');
    });

    setTimeout(() => {
      void router('/client/users/scan');
    }, ERROR_REDIRECT_DELAY);
  };

  const handleSuccess = (message: string) => {
    flushSync(() => {
      onOpen(message, 'green');
    });

    setTimeout(() => {
      void router('/client/users/scan');
    }, ERROR_REDIRECT_DELAY);
  };

  const onSubmit: SubmitHandler<CreateUserForm> = async (data): Promise<void> => {
    if (userId == null)
      return;

    try {
      setIsLoading(true);
      const createData = {
        id: userId,
        name: data.name,
      } satisfies PostUserRequest;

      await postUser(createData);
      handleSuccess('ユーザの登録が完了しました');
    }
    catch (err) {
      handleError(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return { userId, isOpen, color, message, isLoading, onClose, onSubmit };
}
