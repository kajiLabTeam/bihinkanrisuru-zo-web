import { Routes as ReactRouterRoutes, Route } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import EquipmentEditingPage from './pages/admin/equipment-editing';
import AdminEquipmentListPage from './pages/admin/equipment-list';
import EquipmentRegistrationPage from './pages/admin/equipment-registration';
import UserListPage from './pages/admin/user-list';
import TopPage from './pages/top';
import UserEquipmentListPage from './pages/user/equipment-list';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<TopPage />} path="/" />
      <Route element={<AdminLayout />} path="admin" />
      <Route element={<UserListPage />} path="users" />
      <Route path="equipments">
        <Route element={<AdminEquipmentListPage />} index />
        <Route element={<EquipmentRegistrationPage />} path="register" />
        <Route element={<EquipmentEditingPage />} path=":equipment_id/edit" />
      </Route>
      <Route element={<UserLayout />} path="user">
        <Route element={<UserEquipmentListPage />} path="equipments" />
      </Route>
    </ReactRouterRoutes>
  );
}
