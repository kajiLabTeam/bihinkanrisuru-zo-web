import { useUser } from '@/hooks/useUser';
import { useUserSearchText } from '@/hooks/useUserSearchText';
import { Box, Container, Flex, Heading, Link, Spinner, Table, TextField } from '@radix-ui/themes';
import { Pencil } from 'lucide-react';

export default function UserListPage() {
  const { searchText, handleChange } = useUserSearchText();
  const { users, error, loading } = useUser();

  return (
    <Container maxWidth="800px" px="3" py="3">
      <Heading align="center" as="h1">
        ユーザ一覧
      </Heading>
      <Flex justify="between" py="3">
        <Link href="/blank">備品一覧</Link>
        <Link href="/users">ユーザ一覧</Link>
      </Flex>
      <Box py="3">
        <TextField.Root
          onChange={handleChange}
          placeholder="ユーザ番号または名前で検索"
          value={searchText}
        />
      </Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ユーザ番号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ユーザ名</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading
            ? (
                <Table.Row>
                  <Table.Cell colSpan={3} style={{ textAlign: 'center' }}>
                    <Spinner />
                  </Table.Cell>
                </Table.Row>
              )
            : (error != null)
                ? (
                    <Table.Row>
                      <Table.Cell colSpan={3} style={{ textAlign: 'center' }}>
                        {error}
                      </Table.Cell>
                    </Table.Row>
                  )
                : users && users.length > 0
                  ? (
                      users.map((user) => (
                        <Table.Row key={user.id}>
                          <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>
                            <Link href={`/users/edit/${user.id}`}>
                              <Pencil size={16} />
                              編集
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )
                  : (
                      <Table.Row>
                        <Table.Cell colSpan={3} style={{ textAlign: 'center' }}>
                          ユーザーがいません
                        </Table.Cell>
                      </Table.Row>
                    )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
