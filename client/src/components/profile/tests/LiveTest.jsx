import { useState } from 'react'
import { NavLink } from "react-router-dom";
import styles from './liveTest.module.css'

export default function LiveTest() {
  return <div className="mx-4 lg:w-[1000px] lg:mx-auto mt-8">
    <Information />
    <Question />
  </div>
};

function Information() {
  return <div>
    <p className="font-bold text-[20px]">Question 5 of 30</p>
    <input type="range" className={`w-full rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 my-2`} />
    <p className="font-bold text-[20px]">48 : 00 remaining</p>

  </div>
}

function Question({ options }) {
  const [option, setOption] = useState(null);

  function toggleAnswer(id) {
    setOption(id)
  }

  return <div className="mt-10">
    <h1>What is capital of France?</h1>
    {[1, 2, 3, 4].map(key => <div key={key} className="my-2 border-2 p-4 flex items-center gap-4 cursor-pointer rounded-md" onClick={() => toggleAnswer(key)}>
      <input type="radio" className="w-5 aspect-square" checked={option === key} onChange={e => !e.target.value} />
      <p className="font- text-[20px]">Paris</p>
    </div>
    )}
    <div className="text-right mt-10">
      <button className="bg-[#CCCCCC] rounded-md mx-2">Previous</button>
      <button className="bg-[#ADD8E6] rounded-md mx-2">Skipped</button>
      <NavLink to="/tests/1/test-completed">
        <button className="bg-[#00FF00] rounded-md mx-2">Next</button>
      </NavLink>
    </div>
  </div>
}