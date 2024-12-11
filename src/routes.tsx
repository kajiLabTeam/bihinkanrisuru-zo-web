import { Routes as ReactRouterRoutes, Route } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import UserListPage from './pages/admin/user-list';
import TopPage from './pages/top';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<TopPage />} path="/" />

      <Route element={<AdminLayout />} path="admin">
        <Route element={<UserListPage />} path="users" />
      </Route>
    </ReactRouterRoutes>
  );
}
