import { equipmentAtom, fetchEquipmentAtom } from '@/stores/equipment';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useEquipment(redirectPath: string) {
  const router = useNavigate();
  const equipmentId = useParams<{ equipment_id: string }>().equipment_id;

  const equipment = useAtomValue(equipmentAtom);
  const fetchEquipment = useSetAtom(fetchEquipmentAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (equipmentId == null) {
      void router(redirectPath);
      return;
    }

    void (async () => {
      try {
        setIsLoading(true);
        await fetchEquipment(equipmentId);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [equipmentId, fetchEquipment, redirectPath, router]);

  return { equipment, isLoading, error };
}
