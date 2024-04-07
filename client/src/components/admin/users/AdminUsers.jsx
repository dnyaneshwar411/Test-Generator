import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import Error from "../../Error";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()


  function handleSearch(str) {
    setDisplayedUsers(users.filter(user => user.name.toLowerCase().includes(str.toLowerCase())));
  }

  useEffect(function () {
    async function retrieve() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/getusers/alluser");
        const data = await response.json();
        setUsers(data.UserList);
        setDisplayedUsers(data.UserList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    retrieve()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for users" onChange={e => handleSearch(e.target.value)} />
    </div>

    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}

    <div className="border-2 rounded-xl">
      <h1 className="p-4">Users</h1>
      <div className="overflow-x-auto">
        <div className="font-bold flex items-center justify-start border-t-2 p-4">
          <p className="min-w-40">Name</p>
          <p className="min-w-40">Username</p>
          <p className="min-w-40">Email</p>
          <p className="min-w-40">Division</p>
          <p className="min-w-40">Tests Given</p>
        </div>
        {displayedUsers.map(user =>
          <div key={user._id} className="flex items-center justify-start border-t-2 p-4">
            <p className="min-w-40">{user.name}</p>
            <p className="min-w-40">john</p>
            <p className="min-w-40">{user.email}</p>
            <p className="min-w-40">{user.division}</p>
            <p className="min-w-40">{user?.tests?.length || 0}</p>
          </div>
        )}
      </div>
    </div>
  </div>
}