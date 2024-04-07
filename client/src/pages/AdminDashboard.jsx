import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

export default function AdminDashboard() {
  return <div className="flex gap-4 items-start p-4 h-screen">
    <Sidebar />
    <div className="borde-2 grow p-4 max-w-full">
      <Outlet />
    </div>
  </div>
}