import { Heading } from '@radix-ui/themes';

export default function EquipmentRegistrationPage() {
  return <Heading as="h1">管理者用備品登録</Heading>;
}

type EquipmentRegistration = {
  ait_id: string; //1234-0000
  name: string; //備品登録名
  date: {
    purchase_date: string; // 購入日
  };
  place: string; //保管場所
  tag: string[]; //属性
}