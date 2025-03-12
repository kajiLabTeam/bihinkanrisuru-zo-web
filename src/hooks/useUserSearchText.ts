import type { ChangeEvent } from 'react';
import { useState } from 'react';

export function useUserSearchText() {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return { searchText, handleChange };
}
