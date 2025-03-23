import { borrowEquipment } from '@/api/borrowEquipment';
import { returnEquipment } from '@/api/returnEquipment';
import { ERROR_REDIRECT_DELAY } from '@/constants';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { useToast } from './useToast';

export function useEquipmentTransaction() {
  const router = useNavigate();
  const { isOpen, color, message, onOpen, onClose } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { equipment_id, user_id } = useParams<{ equipment_id?: string; user_id?: string }>();
  const equipmentId = equipment_id ?? '';
  const userId = user_id ?? '';

  const _handleError = (err: unknown) => {
    flushSync(() => {
      onOpen(err instanceof Error ? err.message : 'エラーが発生しました', 'red');
    });

    setTimeout(() => {
      void router('/client/equipments/scan');
    }, ERROR_REDIRECT_DELAY);
  };

  const _handleSuccess = (message: string) => {
    flushSync(() => {
      onOpen(message, 'green');
    });

    console.log('こんにちは', isOpen, color, message);
    setTimeout(() => {
      void router('/client/equipments/scan');
    }, ERROR_REDIRECT_DELAY);
  };

  const handleReturnEquipment = async () => {
    try {
      setIsLoading(true);
      await returnEquipment(equipmentId);
      _handleSuccess('備品を返却が完了しました');
    }
    catch (err) {
      _handleError(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleBorrowEquipment = async () => {
    try {
      setIsLoading(true);
      await borrowEquipment(userId, equipmentId);
      _handleSuccess('備品の貸出が完了しました');
    }
    catch (err) {
      _handleError(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return { isOpen, color, message, isLoading, onClose, handleReturnEquipment, handleBorrowEquipment };
}
