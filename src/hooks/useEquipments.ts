import type { Equipment } from '@/types/equipment';
import { getEquipments } from '@/api/getEquipments';

import { useEffect, useState } from 'react';

export function useEquipments() {
  const [equipments, setEquipments] = useState<Equipment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        setIsLoading(true);
        const response = await getEquipments();

        setEquipments(response.equipments);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    }

    void fetchEquipment();
  }, []);

  return { equipments, error, isLoading };
}
