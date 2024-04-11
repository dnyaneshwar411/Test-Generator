import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useGetTest from "../../../hooks/useGetTest";
import Error from "../../Error";
import Loader from "../../Loader";
import { useSelector } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PreviousResults() {
  const [test, setTest] = useState({});
  const [error, setError] = useState();
  const [result, setResult] = useState({});
  const { testId } = useParams();
  const { user } = useSelector(store => store)

  const { loading, getTest } = useGetTest();

  function downloadPDF() {
    const capture = document.querySelector('.result-container');
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = 200;
      const componentHeight = 100;
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      doc.save('receipt.pdf');
    });
  }

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
  }, []);

  useEffect(function () {
    async function retrieve() {
      try {
        const response = await fetch(`http://localhost:3000/test/completedTestsByuser/${user._id}`);
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
    {error && <Error message={error} setter={setError} />}
    <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p>
    <div className="result-container w-full h-auto flex items-center justify-center">
      <div>
        <h2 className="mt-10">{test?.title}</h2>
        <h3 className="my-4">Candidate Information</h3>
        <p><strong>Name : </strong>{user.name}</p>
        <p><strong>Division : </strong>{user.division}</p>
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
      </div>
    </div>

    {loading && <Loader />}

    <button className="btn-tertiary mt-8" onClick={downloadPDF}>Download Report</button>
  </div >
}