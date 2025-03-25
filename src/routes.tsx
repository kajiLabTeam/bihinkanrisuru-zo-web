import { Routes as ReactRouterRoutes, Route } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';
import UserLayout from './layouts/UserLayout';
import EquipmentEditingPage from './pages/admin/equipment-editing';
import AdminEquipmentListPage from './pages/admin/equipment-list';
import EquipmentRegistrationPage from './pages/admin/equipment-registration';
import UserEditPage from './pages/admin/user-editing';
import UserListPage from './pages/admin/user-list';
import EquipmentQRCodeScannerPage from './pages/client/EquipmentQRCodeScanner';
import EquipmentReturnConfirmationPage from './pages/client/EquipmentTransactionConfirmation';
import UserCodeScannerPage from './pages/client/UserCodeScanner';
import UserRegistrationPage from './pages/client/UserRegistrationPage';
import TopPage from './pages/top';
import UserEquipmentListPage from './pages/user/equipment-list';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<TopPage mode="top" />} index />
      <Route element={<AdminLayout />} path="admin">
        <Route path="equipments">
          <Route element={<AdminEquipmentListPage />} index />
          <Route element={<EquipmentRegistrationPage />} path="register" />
          <Route element={<EquipmentEditingPage />} path=":equipment_id/edit" />
        </Route>
        <Route path="users">
          <Route element={<UserListPage />} index />
          <Route element={<UserEditPage />} path=":user_id/edit" />
        </Route>
      </Route>
      <Route element={<UserLayout />} path="user">
        <Route element={<UserEquipmentListPage />} path="equipments" />
      </Route>
      <Route path="client">
        <Route element={<TopPage mode="client" />} index />
        <Route element={<ClientLayout />} path="equipments">
          <Route element={<EquipmentQRCodeScannerPage />} path="scan" />
          <Route
            element={<EquipmentReturnConfirmationPage mode="returns" />}
            path=":equipment_id/returns/:user_id/confirm"
          />
          <Route
            element={<EquipmentReturnConfirmationPage mode="loans" />}
            path=":equipment_id/loans/:user_id/confirm"
          />
        </Route>
        <Route element={<ClientLayout />} path="users">
          <Route element={<UserCodeScannerPage />} path="scan" />
          <Route
            element={<UserRegistrationPage />}
            path=":user_id/register"
          />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
