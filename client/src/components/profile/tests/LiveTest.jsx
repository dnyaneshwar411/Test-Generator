import { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
// import styles from './liveTest.module.css'
import TestSidebar from './TestSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTest } from '../../../redux/store';

export default function LiveTest() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(function () {
    dispatch(fetchTest(id))
  }, [])

  return <div className="mx-4 lg:mx-auto mt-8 flex">
    <TestSidebar />
    <div className='grow px-8'>
      <Information />
      <Question />
    </div>
  </div>
}

function Information() {
  const activeQuestionNo = useSelector(store => store.liveTest.activeQuestionNo)
  const questionsLegth = useSelector(store => (store.liveTest.questions).length)
  return <div>
    <p className="font-bold text-[20px]">Question {activeQuestionNo} of {questionsLegth}</p>
    <input type="range" className={`w-full rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 my-2`} />
    <p className="font-bold text-[20px]">48 : 00 remaining</p>

  </div>
}

function Question() {
  const [selectedOption, setSelectedOption] = useState();
  const { activeQuestion, } = useSelector(store => store.liveTest)
  const options = useSelector(store => store.liveTest.activeQuestion.options)

  function toggleAnswer(id) {
    setSelectedOption(id);
  }

  return <div className="mt-10">
    {/* <h1>{activeQuestion.title}</h1> */}
    {
      options.map(option => <div key={option.id} className="my-2 border-2 p-4 flex items-center gap-4 cursor-pointer rounded-md">
        <input type="radio"
          className="w-5 aspect-square"
          checked={selectedOption === option.id}
          onChange={() => toggleAnswer(option.id)} />
        <p className="font- text-[20px]">{option.value}</p>
      </div>
      )
    }
    <div className="text-right mt-10">
      <button className="bg-[#CCCCCC] rounded-md mx-2">Previous</button>
      <button className="bg-[#ADD8E6] rounded-md mx-2">Skipped</button>
      <NavLink to="/tests/1/test-completed">
        <button className="bg-[#00FF00] rounded-md mx-2">Next</button>
      </NavLink>
    </div>
  </div>
}