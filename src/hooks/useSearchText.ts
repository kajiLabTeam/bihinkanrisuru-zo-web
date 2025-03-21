import type { ChangeEvent } from 'react';
import { useState } from 'react';

export function useSearchText() {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return { searchText, handleChange };
}
