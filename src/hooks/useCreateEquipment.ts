import type { PostEquipmentRequest } from '@/types/equipment';
import type { EditEquipmentForm } from '@/types/form';
import type { SubmitHandler } from 'react-hook-form';
import { postEquipment } from '@/api/postEquipment';
import { equipmentAtom, fetchEquipmentAtom } from '@/stores/equipment';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useCreateEquipment() {
  const router = useNavigate();
  const equipmentId = useParams<{ equipment_id: string }>().equipment_id;

  const equipment = useAtomValue(equipmentAtom);
  const fetchEquipment = useSetAtom(fetchEquipmentAtom);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<EditEquipmentForm> = async (data): Promise<void> => {
    if (equipmentId == null)
      return;

    try {
      setLoading(true);
      const createData = {
        asset_id: data.assetId,
        name: data.name,
        purchase_at: data.purchaseAt,
        place: data.place,
        tag_ids: data.tags.map((tag) => tag.id),
      } satisfies PostEquipmentRequest;

      await postEquipment(createData);

      void router('/admin/equipments');
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (equipmentId == null) {
      return;
    }

    void (async () => {
      try {
        setLoading(true);
        await fetchEquipment(equipmentId);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setLoading(false);
      }
    })();
  }, [equipmentId, fetchEquipment]);

  return { equipment, loading, error, onSubmit };
}
