import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminUsers() {
  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for users" />
    </div>

    <div className="border-2 rounded-xl">
      <h1 className="p-4">Users</h1>
      <div className="overflow-x-auto">
        <div className="font-bold flex items-center justify-start border-t-2 p-4">
          <p className="min-w-40">Name</p>
          <p className="min-w-40">Username</p>
          <p className="min-w-40">Email</p>
          <p className="min-w-40">Status</p>
          <p className="min-w-40">Last Login</p>
        </div>
        {[0, 1, 2, 3, 4].map(key =>
          <div key={key} className="flex items-center justify-start border-t-2 p-4">
            <p className="min-w-40">John Doe</p>
            <p className="min-w-40">john</p>
            <p className="min-w-40">john@gmail.com</p>
            <p className="min-w-40">active</p>
            <p className="min-w-40">2 days ago</p>
          </div>
        )}
      </div>
    </div>
  </div>
}