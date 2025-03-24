import type { EditUserForm } from '@/types/form';
import type { UserStatus } from '@/types/user';
import type { UseFormRegister } from 'react-hook-form';
import { UserStatus as UserStatusValue } from '@/constants';
import { useUserStatus } from '@/hooks/useUserStatus';
import { Select } from '@radix-ui/themes';

interface Props {
  initialStatus: UserStatus;
  register: UseFormRegister<EditUserForm>;
}

export default function UserStatusInput({ initialStatus, register }: Props) {
  const { selectedStatus, handleValueChange } = useUserStatus(initialStatus);

  return (
    <Select.Root defaultValue={initialStatus} onValueChange={handleValueChange} value={selectedStatus}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {Object.values(UserStatusValue).map((value) => (
            <Select.Item key={value} value={value} {...register('status')}>
              {value}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
