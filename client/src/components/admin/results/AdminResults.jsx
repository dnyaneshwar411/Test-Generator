import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Loader from "../../Loader";
import Error from "../../Error"
import { useSelector } from "react-redux";

export default function AdminResults() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [tests, setTests] = useState([]);
  const { _id } = useSelector(store => store.user);

  useEffect(function () {
    async function retrieve() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/test/testCreatedbyAdmin/${_id}`);
        const data = await response.json();
        setTests(data);
        // console.log(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }
    retrieve()
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl mt-6 mb-4">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test results" />
    </div>
    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}
    <div className="flex flex-wrap gap-4 mt-10 justify-eenly">
      {tests.map(test => (<div key={test._id} className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to={`/admin/results/${test._id}`}>
          <h3>{test.title}</h3>
        </NavLink>
      </div>))}

      {/* <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to="/admin/results/456">
          <h3>TEST 2</h3>
        </NavLink>
      </div>

      <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to="/admin/results/789">
          <h3>TEST 3</h3>
        </NavLink>
      </div> */}
    </div>
  </div>
}