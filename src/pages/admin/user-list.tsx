import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react"; //編集のペン

interface User {
  id: string;
  name: string;
}

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // ダミーデータどすえ
  useEffect(() => {
    // 本来はAPIからデータを取得するところですが、データベースが完了するまでダミーデータを入れときます。
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
    <div className="container mx-auto p-6">
      {/* ヘッダー */}
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">ユーザ一覧</h1>
        <nav>
          <Link to="/blank" className="text-blue-500 hover:text-blue-700 mr-4">
            備品一覧
          </Link>
          <Link to="/users" className="text-blue-500 hover:text-blue-700">
            ユーザ一覧
          </Link>
        </nav>
      </header>

      {/* 検索ボックス */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="ユーザ番号または名前で検索"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-1/2 md:w-1/3"
        />
      </div>

      {/* ユーザ一覧テーブル */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-4 text-left">ユーザ番号</th>
              <th className="border p-4 text-left">ユーザ名</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td className="border p-4 text-center" colSpan={3}>
                  データがありません
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border p-4">{user.id}</td>
                  <td className="border p-4">{user.name}</td>
                  <td className="border p-4 text-center">
                    <Link to={`/users/edit/${user.id}`} className="text-blue-500 hover:text-blue-700">
                      <Pencil className="inline mr-2" /> 編集
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
