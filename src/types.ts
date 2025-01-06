type Request = {
    ait_id?: string; //1234-0000
    name?: string; //備品登録名
    date?: {
        purchase_date: string; // 購入日
    };
    place?: string; //保管場所
    tag?: string[]; //属性
};

type Response = {
    result: string;
    error: string; //エラーメッセージ
};