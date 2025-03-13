import { Routes as ReactRouterRoutes, Route } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import EquipmentEditingPage from './pages/admin/equipment-editing';
import AdminEquipmentListPage from './pages/admin/equipment-list';
import EquipmentRegistrationPage from './pages/admin/equipment-registration';
import UserEditPage from './pages/admin/user-editing';
import UserListPage from './pages/admin/user-list';
import TopPage from './pages/top';
import UserEquipmentListPage from './pages/user/equipment-list';
import UserRegistrationPage from './pages/user/user-registration';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<TopPage />} path="/" />
      <Route element={<AdminLayout />} path="admin" />
      <Route path="users">
        <Route element={<UserListPage />} index />
        <Route element={<UserEditPage />} path=":user_id/edit" />
      </Route>
      <Route path="equipments">
        <Route element={<AdminEquipmentListPage />} index />
        <Route element={<EquipmentRegistrationPage />} path="register" />
        <Route element={<EquipmentEditingPage />} path=":equipment_id/edit" />
      </Route>
      <Route element={<UserLayout />} path="user">
        <Route element={<UserEquipmentListPage />} path="equipments" />
        <Route element={<UserRegistrationPage />} path="register" />
      </Route>
    </ReactRouterRoutes>
  );
}
