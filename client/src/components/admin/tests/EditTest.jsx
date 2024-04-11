import { useEffect, useRef, useState } from "react"
import { inputStyles, labelStyles } from "../../../utils/data"
import { useParams } from "react-router-dom"
import useGetTest from "../../../hooks/useGetTest";
import Loader from "../../Loader";
import Error from "../../Error";
import { useSelector } from "react-redux";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import useTests from "../../../hooks/tests/useTests";


export default function EditTest() {
  const { testId } = useParams();
  const { loading, getTest } = useGetTest();
  const [error, setError] = useState();
  const [test, setTest] = useState({});

  const { updateTest } = useTests();

  const name = useSelector(store => store.user.name);

  const fileRef = useRef(null);

  const [questionTitle, setQuestionTitle] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);

  const qLength = questions.length;

  function openFileManager() {
    fileRef.current.click();
  }

  function addQuestion() {
    if (questionTitle === "" || !correctAnswer || !options[0] || !options[1] || !options[2] || !options[3]) return
    const question = {
      title: questionTitle,
      id: qLength + 1,
      answer: correctAnswer
    }
    setQuestions(prev => ([...prev, question]));
    setQuestionTitle("");
    setCorrectAnswer();
  }

  async function handleUpdateTest() {
    try {
      const response = await updateTest(test._id, test);
      if (!response) setError(response.payload);
    } catch (error) {
      setError(error.message)
    }
  }

  function updateQuestions(id, updatedQuestion) {
    const questions = test.questions.map(ques => ques._id === id ? updatedQuestion : ques)
    setTest(prev => ({ ...prev, questions }))
  }

  async function handleForm(e) {
    e.preventDefault();
    const info = {
      testName: e.target[0].value,
      // instruction: e.target[1].value,
      // totalNoOfQuestions: e.target[2].value,
      highestMarks: e.target[1].value,
      passingScore: e.target[2].value,
      availableAt: e.target[3].value,
      testDuration: e.target[4].value,
      answerKey: e.target[5].value,
      questions,
      createdBy: "user 1"
    }

    try {
      const response = await createTest(info);
    } catch (error) {
    }
  }

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await getTest(testId);
        if (response.status) {
          setTest(response.payload.test);
        }
        else setError(response.payload);
      } catch (error) {
        setError(error.message)
      }
    }

    retrieve()
  }, []);

  return <div>

    <div className="md:w-[512px] mx-4 md:mx-auto mt-10">
      {loading && <Loader />}
      {error && <Error message={error} setter={setError} />}

      <form onSubmit={handleForm} className="h-[75vh] overflow-y-auto">
        {test.title && <span>

          <label htmlFor="test-name" className={labelStyles}>Test Name</label>
          <input type="text" id="test-name" className={inputStyles} placeholder="Enter Test Name" value={test.title}
            onChange={e => setTest({ ...test, title: e.target.value })} />

          <label htmlFor="score" className={labelStyles}>Total Score</label>
          <input type="text" id="score" className={inputStyles} placeholder="Total Score" value={test.highestMarks}
            onChange={e => setTest(prev => ({ ...test, highestMarks: Number(e.target.value) ? e.target.value : prev.highestMarks }))} />

          <label htmlFor="passing" className={labelStyles}>Passing Score</label>
          <input type="text" id="passing" className={inputStyles} placeholder="Passing Score" value={test.passingScore}
            onChange={e => setTest(prev => ({ ...test, passingScore: Number(e.target.value) ? e.target.value : prev.passingScore }))} />

          <label htmlFor="availableAt" className={labelStyles}>Available At</label>
          <input type="datetime-local" id="availableAt" className={inputStyles} placeholder="Available At" value={test.availableAt} onChange={e => setTest({ ...test, availableAt: e.target.value })} />

          <label htmlFor="testDuration" className={labelStyles}>Test Duration</label>
          <input type="number" id="testDuration" className={inputStyles} placeholder="Test Duration in minutes" min={1} value={test.testDuration} onChange={e => setTest(prev => ({ ...test, testDuration: Number(e.target.value) ? e.target.value : prev.testDuration }))} />

          <input ref={fileRef} type="file" hidden />
        </span>}

        {test.questions && test.questions.map(question => <Question question={question} key={question._id} setter={updateQuestions} />)}

        <button
          className="btn-primary text-white block ml-auto rounded-3xl"
          type="submit"
          onClick={handleUpdateTest}
        >Update Test</button>
      </form>
    </div>
  </div>
}

function Question({ question, setter }) {
  const [title, setTitle] = useState(question.title);
  const [options, setOptions] = useState(question.options);
  const [answer, setAnswer] = useState(question.answer);
  const [error, setError] = useState(false);

  function updateQuestion() {
    if (!title || !answer) setError(true);
    const ques = { ...question, title, answer, options };
    setter(question._id, ques);
  }

  return <div className="max-w-[500px] mx-auto mt-14">
    {error && <Error message="don't leave any field empty" setter={setError} />}

    <input
      htmlFor="question"
      className={`mb-4 ${title !== question.title ? "bg-red-200" : ""} ${inputStyles}`}
      value={title}
      onChange={e => setTitle(e.target.value)}
    />

    {options.map(option => <input
      key={option.id}
      type="text"
      placeholder="option 1"
      className={`${answer === option.id ? "bg-green-600 font-semibold  text-white" : ""} ${option.id === question.answer ? "bg-red-200" : ""} ${inputStyles}`}
      style={answer == option.id ? { backgroundColor: "#16a34a" } : {}}
      value={option.value}
      onChange={e => setOptions(prev => prev.map(op => op._id === option._id ? ({ ...op, value: e.target.value }) : op))}
    />)}
    <label htmlFor="answer" className={`mt-10 ${labelStyles} block`} >Correct Answer</label>
    <input type="number" id="answer" className={inputStyles} value={answer} max={4} min={1} onChange={e => setAnswer(prev => Number(e.target.value) && e.target.value <= 4 && e.target.value >= 1 ? Number(e.target.value) : prev)} />

    <button
      className="text-[12px] text-teal-50 font-bold bg-blue-400 ml-auto block mb-10"
      onClick={() => updateQuestion(question._id)}
    >Update Question</button>

  </div>
}