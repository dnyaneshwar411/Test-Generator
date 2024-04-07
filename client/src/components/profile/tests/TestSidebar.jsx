import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion } from "../../../redux/store";

export default function TestSidebar() {
  const [isToggled, setIsToggled] = useState(true);
  const questions = useSelector(store => store.liveTest.questions)
  const dispatch = useDispatch()

  function toggleSidebar() {
    setIsToggled(prev => !prev)
  }

  function handleSetQuestion(id) {
    dispatch(setCurrentQuestion(id))
  }

  return <>
    <aside className={`bg-white h-screen w-96 md:min-w-[400px] fixed ${isToggled ? "left-0" : "left-[-100%]"} top-0 md:static md:w-96 md:h-auto border-r-2`}>

      <h1 className="text-center mb-10">Questions</h1>

      <button className="text-[20px] text-center leading-[3rem] font-semibold flex flex-wrap gap-4 px-4">
        {questions?.map(question => <div
          key={question.id}
          className="w-14 aspect-square border-2 rounded-lg"
          onClick={() => handleSetQuestion(question.id)}
        >{question.id}</div>)}

      </button>
    </aside>

    <button className="bg-[#F5F0E5] fixed right-4 bottom-4 p-3 aspect-square lg:hidden z-20 rounded-3xl border-2 shadow-2xl" onClick={toggleSidebar}>
      {!isToggled && <Bars2Icon className="icon-lg" />}
      {isToggled && <XMarkIcon className="icon-lg" />}
    </button>
  </>
}