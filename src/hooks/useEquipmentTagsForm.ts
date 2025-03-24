import type { EditEquipmentForm } from '@/types/form';
import type { Tag } from '@/types/tag';
import type { ChangeEvent } from 'react';
import { DEBOUNCE_TIME } from '@/constants';
import { fetchTagsAtom, tagsAtom } from '@/stores/tag';
import { useAtomValue, useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useEquipmentTagsForm(initialTags: Tag[]) {
  const { setValue } = useFormContext<EditEquipmentForm>();
  const tags = useAtomValue(tagsAtom);
  const fetchTags = useSetAtom(fetchTagsAtom);
  const setTags = useSetAtom(tagsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags);

  const handleSearchTags = debounce(async (name: string) => {
    try {
      setIsLoading(true);
      await fetchTags({ name, sort: 'name', order: 'asc' });
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
    void handleSearchTags(e.target.value);
  }, [handleSearchTags]);

  const handleTagToggle = (tag: { id: string; name: string }) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.some((t) => t.id === tag.id)
        ? prevTags.filter((t) => t.id !== tag.id)
        : [...prevTags, tag];

      setValue('tags', updatedTags);
      return updatedTags;
    });
  };

  const removeTag = (tagId: string) => {
    setTags((prevTags) => prevTags.filter((t) => t.id !== tagId));
  };

  useEffect(() => {
    if (tags.length > 0) {
      setSelectedTags(initialTags);
      setValue('tags', (initialTags));
    }
  }, [tags, setValue, initialTags]);

  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true);
        await fetchTags({});
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [fetchTags]);

  return { tags, selectedTags, searchTerm, error, isLoading, handleInputChange, handleTagToggle, removeTag };
}
