export type EquipmentsRequest = {
    equipment_id?: string; //1234-0000
    name?: string; //備品登録名
    date?: {
        purchase_date: Date; // 購入日
    };
    place?: string; //保管場所
    tag?: string[]; //属性
};

export type EquipmentsResponse = {
    result: "ok" | "error";
    error: string; //エラーメッセージ
};

export type Equipments = {
    equipment_id: string;
    asset_id: string;
    name: string;
    status: {
        state: string;
        borrower?: string;
        borrowed_date?: Date;
    };
    date: {
        registration_date: Date;
        purchase_date: Date;
    };
    place: string;
    tag?: string[];
};