import type { EditUserForm } from '@/types/form';
import type { UserStatus } from '@/types/user';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useUserStatus(initialStatus: UserStatus) {
  const { setValue } = useFormContext<EditUserForm>();
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(initialStatus);

  const handleValueChange = (status: UserStatus) => {
    setSelectedStatus(status);
    setValue('status', status);
  };

  useEffect(() => {
    setValue('status', initialStatus);
  }, [initialStatus, setValue]);

  return { selectedStatus, handleValueChange };
}
