import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import TestInfo from "./TestInfo";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import Error from "../../Error";

export default function RecentTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function getTests() {
      try {
        setLoading(true)
        const response = await fetch("");
        setTests([]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getTests()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test" />
    </div>
    <h2 className="mt-8">Recently generated</h2>
    {loading && <Loader />}
    {error && <Error message="this is a error message" setter={setError} />}

    {tests.map(test => <div key={test} className="flex items-center justify-between">
      <TestInfo />
      <NavLink to="/admin/dashboard/test/1/details">
        <button className="bg-[#F5F0E5] text-[14px] rounded-3xl">View Details</button>
      </NavLink>
    </div>)}
  </div>
}