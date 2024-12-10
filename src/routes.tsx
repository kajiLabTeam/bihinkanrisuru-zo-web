import { Routes as ReactRouterRoutes, Route } from "react-router";
import TopPage from "./pages/top";
import AdminLayout from "./layouts/AdminLayout";
import UserListPage from "./pages/admin/user-list";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<TopPage />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route path="users" element={<UserListPage />} />
      </Route>
    </ReactRouterRoutes>
  );
}
