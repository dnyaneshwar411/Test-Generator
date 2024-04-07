import { MagnifyingGlassIcon, ClockIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useGetTests from "../../hooks/useGetTests";


export default function Tests() {
  const { loading, getTests, tests } = useGetTests();
  const [test, setTest] = useState(null);
  function showDetails(id) {
    setTest(prev => prev === id ? null : id);
  }

  useEffect(function () {
    async function retrieve() {
      try {
        await getTests();
      } catch (error) {
        console.log(error.message)
      }
    }

    retrieve();
  }, [])

  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test" />
    </div>

    <div className="flex flex-wrap gap-4 mt-10 justify-evnly">
      {loading && <>Data is being fetched</>}
      {tests.tests && tests.tests.map(test =>
        <div key={test._id} className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] md:max-w-[350px] cursor-pointer" onClick={() => showDetails(test)}>
          <h3>{test.title}</h3>
          <p>Date: {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
          {/* <p>Date: 15<sup>th</sup>March 2023</p> */}
          <p>Duration: {test.testDuration} mins</p>

          <p className="text-right text-blue-600 font-semibold">Completed</p>
        </div>
      )}
    </div>

    {test && <Info test={test} />}

  </div>
}

function Info({ test }) {
  return <div className="mt-8">
    <h3>{test.title}</h3>
    <p>This test is available from {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
    <h3 className="mt-4">Test Link</h3>
    <p>This link will be active 15 minute before the test begins</p>

    <div className="flex items-center gap-2 mt-4">
      <ClockIcon className="w-10 h-10" />
      <div>
        <p>Test Time</p>
        <span>9:00 am - 10:00am</span>
      </div>
    </div>

    <div className="flex items-center gap-2 mt-4">
      <GlobeAltIcon className="w-10 h-10" />
      <div>
        <p>Test URL</p>
        <span>This link will be active 15 minutes before the test in a proctored environment.</span>
      </div>
    </div>

    <h3 className="mt-4">Test ID’s</h3>
    <p>This is for students who are taking the test in a proctored environment.</p>
    <NavLink to="/tests/1/generate">
      <button className="btn-scnd mt-10 block mx-auto rounded-2xl">Generate username and password</button>
    </NavLink>
  </div>
}