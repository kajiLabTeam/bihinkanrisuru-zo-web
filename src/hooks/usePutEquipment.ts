import type { PutEquipmentRequest } from '@/types/equipment';
import type { EditEquipmentForm } from '@/types/form';
import type { SubmitHandler } from 'react-hook-form';
import { putEquipment } from '@/api/putEquipment';
import { equipmentAtom, fetchEquipmentAtom } from '@/stores/equipment';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function usePutEquipment() {
  const router = useNavigate();
  const equipmentId = useParams<{ equipment_id: string }>().equipment_id;

  const equipment = useAtomValue(equipmentAtom);
  const fetchEquipment = useSetAtom(fetchEquipmentAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<EditEquipmentForm> = async (data): Promise<void> => {
    if (equipmentId == null)
      return;

    try {
      setIsLoading(true);
      const updateData = {
        asset_id: data.assetId,
        name: data.name,
        status: data.status,
        purchase_at: data.purchaseAt,
        place: data.place,
        tag_ids: data.tags.map((tag) => tag.id),
      } satisfies PutEquipmentRequest;

      await putEquipment(equipmentId, updateData);

      void router('/admin/equipments');
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (equipmentId == null) {
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
  }, [equipmentId, fetchEquipment]);

  return { equipment, isLoading, error, onSubmit };
}
