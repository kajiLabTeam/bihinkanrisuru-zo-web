import type { EquipmentStatus } from '@/types/equipment';
import type { EditEquipmentForm } from '@/types/form';
import type { UseFormRegister } from 'react-hook-form';
import { EquipmentStatus as EquipmentStatusValue } from '@/constants';
import { useEquipmentStatus } from '@/hooks/useEquipmentStatus';
import { Select } from '@radix-ui/themes';

interface Props {
  initialStatus: EquipmentStatus;
  register: UseFormRegister<EditEquipmentForm>;
}

export default function EquipmentStatusInput({ initialStatus, register }: Props) {
  const { selectedStatus, handleValueChange } = useEquipmentStatus(initialStatus);

  return (
    <Select.Root defaultValue={initialStatus} onValueChange={handleValueChange} value={selectedStatus}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {Object.values(EquipmentStatusValue).map((value) => {
            const isBorrowed = selectedStatus === EquipmentStatusValue.BORROWED;
            const isAvailableOrLost = selectedStatus === EquipmentStatusValue.AVAILABLE || selectedStatus === EquipmentStatusValue.LOST;
            const isDisabled = (isBorrowed && value === EquipmentStatusValue.AVAILABLE) || (isAvailableOrLost && value === EquipmentStatusValue.BORROWED);

            return (
              <Select.Item disabled={isDisabled} key={value} value={value} {...register('status')}>
                {value}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
