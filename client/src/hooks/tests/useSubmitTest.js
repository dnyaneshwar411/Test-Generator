import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endTest } from "../../redux/store";

export default function useSubmitTest() {
  const [loading, setLoading] = useState(false);
  const { userResponses, _id } = useSelector(store => store.liveTest);
  const dispatch = useDispatch();

  async function submitTest() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/test/${_id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userResponses, id: _id }),
      })
      const data = await response.json();

      dispatch(endTest());
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, submitTest }
}