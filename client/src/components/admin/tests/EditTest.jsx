import { useEffect, useState } from "react"
import { inputStyles, labelStyles } from "../../../utils/data"
import { useParams } from "react-router-dom"
import useGetTest from "../../../hooks/useGetTest";
import Loader from "../../Loader";
import Error from "../../Error";

export default function EditTest() {
  const { testId } = useParams();
  const { loading, getTest } = useGetTest()
  const [error, setError] = useState();
  const [test, setTest] = useState([])

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await getTest(testId);
        if (response.status) setTest(response.payload.test);
        else setError(response.payload);
      } catch (error) {
        setError(error.message)
      }
    }

    retrieve()
  }, [])
  return <div>
    {loading && <Loader />}
    {error && <Error message={error} setter={setError} />}
    {test.questions && test.questions.map(question => <Question question={question} key={question._id} />)}
  </div>
}

function Question({ question }) {

  return <div className="max-w-[500px] mx-auto mt-14">
    {/* {testId} */}
    <label htmlFor="question" className={`mb-4 ${labelStyles}`}>{question.id}&#41; {question.title}</label>

    {question.options.map(option => <input
      key={option.id}
      type="text"
      placeholder="option 1"
      className={`${question.answer === option.id ? "font-semibold bg-green-600 text-white" : ""} ${inputStyles}`}
      value={option.value}
      onChange={() => { }}
    />)}

  </div>
}