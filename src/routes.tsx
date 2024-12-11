import { Routes as ReactRouterRoutes, Route } from "react-router";
import TopPage from "./pages/top";
import AdminLayout from "./layouts/AdminLayout";
import UserListPage from "./pages/admin/user-list";
import UserEquipmentListPage from "./pages/user/equipment-list";
import UserLayout from "./layouts/UserLayout";
import AdminEquipmentListPage from "./pages/admin/equipment-list";
import EquipmentRegistrationPage from "./pages/admin/equipment-registration";
import EquipmentEditingPage from "./pages/admin/equipment-editing";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<TopPage />} />
      <Route path="admin" element={<AdminLayout />} />
      <Route path="users" element={<UserListPage />} />
      <Route path="equipments">
        <Route index element={<AdminEquipmentListPage />} />
        <Route path="register" element={<EquipmentRegistrationPage />} />
        <Route path=":equipment_id/edit" element={<EquipmentEditingPage />} />
      </Route>
      <Route path="user" element={<UserLayout />}>
        <Route path="equipments" element={<UserEquipmentListPage />} />
      </Route>
    </ReactRouterRoutes>
  );
}
