import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="min-h-screen md:pl-64">
        <Outlet />
      </div>
    </div>
  );
}