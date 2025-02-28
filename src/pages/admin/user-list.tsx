import { useState, useEffect } from "react";
import { Link } from "@radix-ui/themes"; 
import { Pencil } from "lucide-react"; 

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
    <div>
      {/* ヘッダー */}
      <header>
        <h1>ユーザ一覧</h1>
        <nav>
          <Link href="/blank">備品一覧</Link>
          <Link href="/users">ユーザ一覧</Link>
        </nav>
      </header>

      {/* 検索ボックス */}
      <div>
        <input
          type="text"
          placeholder="ユーザ番号または名前で検索"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>

      {/* ユーザ一覧テーブル */}
      <div>
        <table>
          <thead>
            <tr>
              <th>ユーザ番号</th>
              <th>ユーザ名</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={3}>データがありません</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <Link href={`/users/edit/${user.id}`}>
                      <Pencil /> 編集
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
