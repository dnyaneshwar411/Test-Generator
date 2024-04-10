import { useParams } from "react-router-dom"

export default function PreviousResults() {
  const { testId } = useParams();

  return <div>
    <h2>SAT Math Practice Test</h2>
    <p className="max-w-[70ch]">You can upload a key to use for grading. You can upload a .csv file with student responses and scores, or a .txt file with student responses only.</p>
    <table className="mt-10">
      <tbody>
        <tr>
          <td className="pt-4 pr-4">Duration:  1 Hour</td>
          <td>Test Status: Completed</td>
        </tr>
        <tr>
          <td className="pr-4">Test Date: 23 Feb 2023</td>
          <td>Test  Time: 3 pm - 4pm</td>
        </tr>
        <tr>
          <td className="pr-4">Test Question: 30 Question of 2 Marks Each</td>
          <td>Total Marks: 60</td>
        </tr>
        <tr>
          <td className="pr-4">Test Status: Pass</td>
          <td>Marks Earned:50 </td>
        </tr>
        <tr>
          <td className="pr-4">Correct Answer: 25/30</td>
          <td>Wrong Answer: 25/30</td>
        </tr>
        <tr>
          <td className="pr-4">Attempt: 30/30</td>
          <td>Skipped: 0/30</td>
        </tr>
      </tbody>
    </table>

    <button className="btn-tertiary mt-8">Download Report</button>
  </div>
};