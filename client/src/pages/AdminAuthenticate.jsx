import { Outlet } from "react-router-dom";

export default function AdminAuthenticate() {
  return <div className="md:w-[512px] mx-4 md:mx-auto pb-16">
    <h1 className="text-[28px] text-center font-bold my-10">Welcome Admin</h1>
    <Outlet />
  </div>
};