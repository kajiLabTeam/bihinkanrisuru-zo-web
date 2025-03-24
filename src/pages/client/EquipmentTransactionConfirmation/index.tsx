import { Toast } from '@/components/Toast';
import { useEquipment } from '@/hooks/useEquipment';
import { useEquipmentTransaction } from '@/hooks/useEquipmentTransaction';
import { useUser } from '@/hooks/useUser';
import { Button, Code, DataList, Flex, Link, Spinner } from '@radix-ui/themes';

interface Props {
  mode: 'loans' | 'returns';
}

export default function EquipmentTransactionConfirmationPage({ mode }: Props) {
  const { isOpen, color, message, onClose, handleReturnEquipment, handleBorrowEquipment } = useEquipmentTransaction();
  const { equipment, isLoading: equipmentIsLoading } = useEquipment('/client/equipments/scan');
  const { user, isLoading: userIsLoading } = useUser('/client/equipments/scan');
  const isLoading = equipmentIsLoading || userIsLoading;

  return (
    <Flex
      align="center"
      direction="column"
      gap="6"
      justify="center"
      style={{ height: '80vh', width: '100%' }}
    >
      {isLoading
        ? (
            <>
              <Spinner size="3" />
              <p>読み込み中...</p>
            </>
          )
        : equipment && user
          ? (
              <>
                <h1>{mode === 'loans' ? '貸出確認' : '返却確認' }</h1>
                <DataList.Root size="3">
                  <DataList.Item>
                    <DataList.Label minWidth="88px">ユーザID</DataList.Label>
                    <DataList.Value>
                      <Flex align="center" gap="2">
                        <Code variant="ghost">{user.id}</Code>
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">ユーザ名</DataList.Label>
                    <DataList.Value>{user.name}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">備品名</DataList.Label>
                    <DataList.Value>{equipment.name}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">貸出日時</DataList.Label>
                    <DataList.Value>{new Date().toLocaleString()}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
                <Flex gap="8" justify="center">
                  <Flex align="center" justify="between">
                    <Link href="/client/equipments/scan" size="4">キャンセル</Link>
                  </Flex>
                  <Flex align="center" justify="between">
                    <Button
                      onClick={() => void (mode === 'loans' ? handleBorrowEquipment() : handleReturnEquipment())}
                      size="4"
                    >
                      確定
                    </Button>
                  </Flex>
                </Flex>
              </>
            )
          : (
              <p>備品情報またはユーザ情報が見つかりません。</p>
            )}
      {
        isOpen && (color != null) && (message != null) && (
          <Toast color={color} message={message} onClose={onClose} />
        )
      }
    </Flex>
  );
}
