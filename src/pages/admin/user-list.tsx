import { useState, useEffect } from "react";
import { Link } from "@radix-ui/themes";
import { Pencil } from "lucide-react";
import { Table, Box, TextField, Container, Heading, Flex, Button } from "@radix-ui/themes";

interface User {
  id: string;
  name: string;
}

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const dummyData: User[] = [
      { id: "20k23075", name: "Tadachan" },
      { id: "19k22095", name: "Mizukichan" },
      { id: "19x22000", name: "s.ayakachan" },
      { id: "19k22000", name: "gomamonochan" },
      { id: "10k00000", name: "Kajichan" },
    ];
    setUsers(dummyData);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.id.includes(search) || user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="800px" px="3" py="3">
      {/* ヘッダー */}
      <Heading align="center" as="h1">
        ユーザ一覧
      </Heading>

      <Flex justify="between" py="3">
        <Link href="/blank">備品一覧</Link>
        <Link href="/users">ユーザ一覧</Link>
      </Flex>

      {/* 検索 */}
      <Box py="3">
        <TextField.Root
          placeholder="ユーザ番号または名前で検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* ユーザ一覧テーブル */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ユーザ番号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ユーザ名</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredUsers.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} style={{ textAlign: "center" }}>
                データがありません
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>
                  <Link href={`/users/edit/${user.id}`}>
                    <Pencil size={16} /> 編集
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
