import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../components/Admin/Topbar/Topbar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Topbar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
