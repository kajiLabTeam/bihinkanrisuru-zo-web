export const BACKEND_URL = import.meta.env.VITE_API_URL;
export const DEBOUNCE_TIME = 300;

export const EquipmentStatus = {
  AVAILABLE: 'AVAILABLE',
  BORROWED: 'BORROWED',
  LOST: 'LOST',
} as const;
