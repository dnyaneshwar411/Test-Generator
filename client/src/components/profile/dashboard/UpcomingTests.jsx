import { useEffect } from "react";
import useGetTests from "../../../hooks/useGetTests";
import TestInfo from "./TestInfo";
import { InfinitySpin } from "react-loader-spinner";
import Loader from "../../Loader";

export default function UpcomingTests() {
  const { loading, getTests, tests } = useGetTests();

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
    <h2>Upcoming Tests</h2>
    {loading && <Loader />}
    {tests.tests && tests.tests.map(test => <TestInfo key={test._id} test={test} />)}
  </div>
}