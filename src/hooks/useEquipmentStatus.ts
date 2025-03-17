import type { EquipmentStatus } from '@/types/equipment';
import type { EditEquipmentForm } from '@/types/form';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useEquipmentStatus(initialStatus: EquipmentStatus) {
  const { setValue } = useFormContext<EditEquipmentForm>();
  const [selectedStatus, setSelectedStatus] = useState<EquipmentStatus>(initialStatus);

  const handleValueChange = (status: EquipmentStatus) => {
    setSelectedStatus(status);
    setValue('status', status);
  };

  useEffect(() => {
    setValue('status', initialStatus);
  }, [initialStatus, setValue]);

  return { selectedStatus, handleValueChange };
}
