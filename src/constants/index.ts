export const BACKEND_URL = import.meta.env.VITE_API_URL;
export const DEBOUNCE_TIME = 300;
export const TOAST_DURATION = 3000;
export const SCAN_INTERVAL = 300;
export const ERROR_REDIRECT_DELAY = 3000;

export const EquipmentStatus = {
  AVAILABLE: 'AVAILABLE',
  BORROWED: 'BORROWED',
  LOST: 'LOST',
} as const;

export const UserStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const TOP_LINK_DATA = {
  '/equipments': '備品一覧',
  '/admin': '管理者ログイン',
};

export const CLIENT_LINK_DATA = {
  '/client/equipments/scan': '備品貸出・返却ページ',
  '/client/users/scan': 'ユーザ登録ページ',
};
