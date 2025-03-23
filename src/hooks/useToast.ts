import { useState } from 'react';

export function useToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const onOpen = (message: string, color: string) => {
    console.log(message);
    setMessage(message);
    setColor(color);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, color, message, onOpen, onClose };
}
