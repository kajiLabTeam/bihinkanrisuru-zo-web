import type { CSSProperties } from 'react';
import { TOAST_DURATION } from '@/constants';
import { useEffect } from 'react';
import styles from './index.module.scss';

interface Props {
  color: string;
  message: string;
  onClose: () => void;
}

export function Toast({ color, message, onClose }: Props) {
  const toastStyle: CSSProperties = {
    backgroundColor: color,
  };

  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles.toast} style={toastStyle}>
      <span>{message}</span>
      <button
        className={styles['close-button']}
        onClick={onClose}
        type="button"
      >
        &times;
      </button>
    </div>
  );
}
