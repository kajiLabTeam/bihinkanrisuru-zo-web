import type { ChangeEvent } from 'react';
import { DEBOUNCE_TIME } from '@/constants';
import { equipmentsAtom, fetchEquipmentsAtom } from '@/stores/equipment';
import { useAtomValue, useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export function useEquipments() {
  const equipments = useAtomValue(equipmentsAtom);
  const fetchEquipments = useSetAtom(fetchEquipmentsAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchEquipments = debounce(async (search: string) => {
    try {
      setIsLoading(true);
      await fetchEquipments({ search, sort: 'name', order: 'asc' });
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
    finally {
      setIsLoading(false);
    }
  }, DEBOUNCE_TIME);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    void handleSearchEquipments(e.target.value);
  }, [handleSearchEquipments]);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        setIsLoading(true);
        await fetchEquipments({});
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    }

    void fetchEquipment();
  }, [fetchEquipments]);

  return { equipments, error, searchTerm, isLoading, handleInputChange };
}
