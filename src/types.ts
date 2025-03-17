export interface EquipmentsRequest {
  asset_id?: string; // 1234-0000,手動入力
  name?: string; // 備品登録名
  purchase_date?: number; // 購入日
  place?: string; // 保管場所
  tag?: string[]; // 属性
}

export interface EquipmentsResponse {
  result: 'ok' | 'error';
  error: string; // エラーメッセージ
}

export interface Equipments {
  equipment_id: string;
  asset_id: string;
  name: string;
  state: string;
  borrower?: string;
  borrowed_date?: number;
  registration_date: number;
  purchase_date?: number;
  place?: string;
  tag?: string[];
}

export interface Users {
  id: string;
  name: string;
}
