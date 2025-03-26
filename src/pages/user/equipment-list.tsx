import { useEquipments } from '@/hooks/useEquipments';
import { Badge, Box, Container, Spinner, Table, TextField } from '@radix-ui/themes';

export default function UserEquipmentListPage() {
  const { equipments, error, isLoading, searchTerm, handleInputChange } = useEquipments();

  return (
    <Container maxWidth="1000px" px="3" py="3">
      <Box py="3">
        <TextField.Root
          onChange={handleInputChange}
          placeholder="備品番号または名前で検索"
          value={searchTerm}
        />
      </Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>備品番号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>備品名</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>利用者</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ステータス</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>保管場所</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>タグ</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>購入日</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? (
                <Table.Row>
                  <Table.Cell colSpan={8} style={{ textAlign: 'center' }}>
                    <Box>
                      <Spinner />
                    </Box>
                  </Table.Cell>
                </Table.Row>
              )
            : (error != null)
                ? (
                    <Table.Row>
                      <Table.Cell colSpan={8} style={{ textAlign: 'center' }}>
                        {error}
                      </Table.Cell>
                    </Table.Row>
                  )
                : equipments.length > 0
                  ? (
                      equipments.map((equipment) => (
                        <Table.Row key={equipment.id}>
                          <Table.RowHeaderCell>
                            {equipment.asset_id}
                          </Table.RowHeaderCell>
                          <Table.Cell>{equipment.name}</Table.Cell>
                          <Table.Cell>{equipment.borrower ? equipment.borrower.name : '-'}</Table.Cell>
                          <Table.Cell>
                            <Badge color={equipment.status === 'BORROWED' ? 'blue' : equipment.status === 'AVAILABLE' ? 'green' : 'indigo'}>
                              {equipment.status}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>{equipment.place}</Table.Cell>
                          <Table.Cell>
                            {
                              equipment.tags.map((tag) => (
                                <Badge key={tag.id}>
                                  {tag.name}
                                </Badge>
                              ))
                            }
                          </Table.Cell>
                          <Table.Cell>{new Date(equipment.purchase_at).toLocaleDateString()}</Table.Cell>
                        </Table.Row>
                      ))
                    )
                  : (
                      <Table.Row>
                        <Table.Cell colSpan={8} style={{ textAlign: 'center' }}>
                          登録されている備品はありません
                        </Table.Cell>
                      </Table.Row>
                    )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
