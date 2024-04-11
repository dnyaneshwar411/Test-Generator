import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useGetTest from "../../../hooks/useGetTest";
import Error from "../../Error";
import Loader from "../../Loader";
import { useSelector } from "react-redux";

export default function PreviousResults() {
  const [test, setTest] = useState({});
  const [error, setError] = useState();
  const [result, setResult] = useState({});
  const { testId } = useParams();
  const { _id } = useSelector(store => store.user)

  const { loading, getTest } = useGetTest()
  useEffect(function () {
    async function retireve() {
      try {
        const response = await getTest(testId);
        if (!response.status) setError(response.paylaod);
        else setTest(response.payload.test)
        // const info = 
      } catch (error) {
        setError(error.message);
      }
    }

    retireve();
  }, [])

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await fetch(`http://localhost:3000/test/completedTestsByuser/${_id}`);
        const data = await response.json();
        if (response.status) {
          const requiredData = data.find(res => res.testId = testId)
          setResult(requiredData);
        }
        // else setError(response.payload);
      } catch (error) {
        setError(error.message);
      }
    }

    retrieve();
  }, [])

  return <div>
    <h2>{test?.title}</h2>
    {error && <Error message={error} setter={setError} />}

    <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p>
    {test._id && <table className="mt-10">
      <tbody>
        <tr>
          <td className="pt-4 pr-4"><strong>Duration:</strong>  {test?.testDuration} mins</td>
          <td><strong>Total Marks:</strong> {test.highestMarks}</td>
        </tr>
        <tr>
          <td className="pr-4"><strong>Test Status:</strong> {test?.isReleased ? test.passingMarks <= result.score ? "Passed" : "Failed" : "Test answers not released yet"}</td>
          {test.isReleased && <td><strong>Marks Earned:</strong> {result.score}</td>}
        </tr>
        {test.isReleased && <tr>
          <td className="pr-4"><strong>Correct Answer:</strong> {result.score}/{test?.questions?.length}</td>
          <td><strong>Wrong Answer:</strong> {test?.questions?.length - result.score}/{test?.questions?.length}</td>
        </tr>}
        <tr>
          <td className="pr-4"><strong>Attempt:</strong> {test?.questions?.length}/{test?.questions?.length}</td>
          <td><strong>Skipped:</strong> 0/{test?.questions?.length}</td>
        </tr>
      </tbody>
    </table>}

    {loading && <Loader />}

    <button className="btn-tertiary mt-8">Download Report</button>
  </div >
}