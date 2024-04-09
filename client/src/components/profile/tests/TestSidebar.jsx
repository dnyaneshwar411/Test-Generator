import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion } from "../../../redux/store";
import ModalEndExam from "./ModalEndExam";

export default function TestSidebar() {
  const [isToggled, setIsToggled] = useState(false);
  const questions = useSelector(store => store.liveTest.questions);
  const activeQuestionNo = useSelector(store => store.liveTest.activeQuestionNo);
  const dispatch = useDispatch();

  const [wantToSubmit, setWantToSubmit] = useState(false);

  function toggleSidebar() {
    setIsToggled(prev => !prev);
  }

  function handleSetQuestion(id) {
    dispatch(setCurrentQuestion(id));
  }

  return <>
    <aside className={`bg-white w-96 md:min-w-[400px] fixed ${isToggled ? "left-0" : "left-[-100%]"} top-0 md:static md:w-96 md:h-auto border-r-2 py-20 shadow-lg`}>

      <h1 className="text-center mb-10">Questions</h1>

      <div className="text-[20px] text-center font-semibold flex flex-wrap gap-4 px-4">
        {questions?.map(question => <button
          key={question.id}
          className={`w-14 ${activeQuestionNo === question.id ? "bg-green-400" : ""} aspect-square border-2 rounded-lg`}
          onClick={() => handleSetQuestion(question.id)}
        >{question.id}</button>)}
      </div>
      <button className="bg-red-600 text-white block mt-8 mx-auto rounded-lg" onClick={() => setWantToSubmit(true)}>Submit</button >
    </aside >
    {wantToSubmit && <ModalEndExam message="Do you want submit the test">
      <button className="bg-green-600 text-white mt-8 ml-4 rounded-lg" onClick={() => setWantToSubmit(false)}>Cancel</button>
    </ModalEndExam>
    }
    <button className="bg-[#F5F0E5] fixed right-4 bottom-4 p-3 aspect-square lg:hidden z-20 rounded-3xl border-2 shadow-2xl" onClick={toggleSidebar}>
      {!isToggled && <Bars2Icon className="icon-lg" />}
      {isToggled && <XMarkIcon className="icon-lg" />}
    </button>
  </>
}