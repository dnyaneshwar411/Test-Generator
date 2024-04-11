import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loader from "../../Loader";
import Error from "../../Error";
import useGetTest from "../../../hooks/useGetTest";

export default function AdminTestResults() {
  const { id } = useParams();
  const [test, setTest] = useState({});
  const [error, setError] = useState()
  const [users, setUsers] = useState([]);
  const { loading, getTest } = useGetTest();

  useEffect(function () {

    async function retrieve() {
      try {
        const response = await fetch(`http://localhost:3000/test/get-test-by-id/${id}/populate`);
        const data = await response.json()
        // if (!response.status) setError(response.payload);
        // console.log(data)
        // setTest(data.test);
      } catch (error) {
        setError(error.message);
      }
    }
    retrieve()
  }, [])
  return <div>
    <h1>List of Students Given this test - <span className="text-green-500">{test?.title}</span></h1>

    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}

    <table className="border-separate border-spacing-2 border table-auto mt-10">
      <thead>
        <tr>
          <th>
            Candidate Name
          </th>
          <th>
            Marks Scored
          </th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
}