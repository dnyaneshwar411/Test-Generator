import { MagnifyingGlassIcon, ClockIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetTests from "../../hooks/useGetTests";
import Error from "../Error";
import Loader from "../Loader";
import TestCart from "./tests/TestCart";

export default function Tests() {
  const { loading, getTests } = useGetTests();
  const [error, setError] = useState();
  const [test, setTest] = useState();

  const [tests, setTests] = useState([]);
  const [displayedTests, setDisplayedTests] = useState([]);

  function handleSearch(str) {
    setDisplayedTests(tests.filter(test => test.title.toLowerCase().includes(str.toLowerCase())));
  }

  function showDetails(id) {
    setTest(prev => prev === id ? null : id);
  }

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await getTests();
        if (response.status) {
          setTests(response.payload.tests)
          setDisplayedTests(response.payload.tests)
        }
        else setError(response.payload)
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
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test" onChange={e => handleSearch(e.target.value)} />
    </div>

    <div className="flex flex-wrap gap-4 mt-10 justify-evnly">
      {loading && <Loader />}
      {error && <Error message={error} setter={setError} />}
      {displayedTests && displayedTests.map(test => <TestCart key={test._id} test={test} showDetails={showDetails} />)}
    </div>
    {test && <Info test={test} />}

  </div>
}

function Info({ test }) {
  const { _id } = useSelector(store => store.user)
  const isGiven = test.participants.findIndex(user => user.userId === _id);
  return <div className="mt-8">
    <h3>{test.title}</h3>
    <p><strong>Test date</strong> - {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
    <p><strong>Test Time </strong> - {test.testDuration} minutes</p>
    <NavLink to={`/tests/${test._id}/test-live/`}>
      {isGiven === -1 && <button className="btn-scnd mt-10 block mx-auto rounded-2xl">Give This Test</button>}
    </NavLink>
    {isGiven !== -1 && <button className="btn-scnd opacity-40 mt-10 block mx-auto rounded-2xl cursor-not-allowed" disabled>Already Given</button>}
  </div>
}