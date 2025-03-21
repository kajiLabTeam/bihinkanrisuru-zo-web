import type { Tag } from '@/types/tag';
import { useTags } from '@/hooks/useTags';
import { CheckIcon } from '@radix-ui/react-icons';
import { Badge, Box, Flex, IconButton, Popover, ScrollArea, TextField } from '@radix-ui/themes';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  initialTags: Tag[];
}

export default function TagInput({ initialTags }: Props) {
  const { tags, selectedTags, searchTerm, handleInputChange, handleTagToggle } = useTags(initialTags);
  const [open, setOpen] = useState(false);

  return (
    <Flex gap="4">
      {selectedTags.length > 0
        ? (
            <Flex gap="2">
              {selectedTags.map((tag) => (
                <Badge key={tag.id} size="3">
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          )
        : null}
      <Popover.Root onOpenChange={setOpen} open={open}>
        <Popover.Trigger>
          <IconButton size="1" variant="ghost">
            <PlusIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content style={{ width: '250px', padding: '10px' }}>
          <TextField.Root
            onChange={(e) => { handleInputChange(e); }}
            placeholder="タグ名を入力"
            style={{ width: '100%', marginBottom: '8px' }}
            value={searchTerm}
          />
          <ScrollArea style={{ maxHeight: '200px' }}>
            {tags.length > 0
              ? (
                  tags.map((tag) => {
                    const isSelected = selectedTags.some((t) => t.id === tag.id);
                    return (
                      <Flex
                        align="center"
                        gap="2"
                        key={tag.id}
                        onClick={() => { handleTagToggle(tag); }}
                        p="2"
                      >
                        {isSelected ? <CheckIcon /> : null}
                        {tag.name}
                      </Flex>
                    );
                  })
                )
              : (
                  <Box p="2">タグが見つかりません</Box>
                )}
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>
    </Flex>

  );
}
