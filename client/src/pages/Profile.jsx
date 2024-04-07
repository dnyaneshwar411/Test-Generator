import { Outlet } from "react-router-dom";
import Sidebar from "../components/profile/Sidebar";

export default function Profile() {
  return <div className="flex gap-4 items-start p-4 h-screen">
    <Sidebar />
    <div className="borde-2 grow p-4">
      <Outlet />
    </div>
  </div>
};