import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loader from "../../Loader";
import Error from "../../Error";

export default function AdminTestResults() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await fetch("");
        const data = response.json();
        console.log(data)
      } catch (error) {
        setError(error.message);
      }
    }
  }, [])
  return <div>
    <h1>List of Students Given this test - <span className="text-green-500">Test 1</span></h1>

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