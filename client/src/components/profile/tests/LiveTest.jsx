import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import TestSidebar from './TestSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { goToNextQuestion, goToPreviousQuestion, saveCurrentAnswer, startTest } from '../../../redux/store';
import Information from './Information';
import ModalEndExam from './ModalEndExam';
import enableFullscreen from '../../../utils/Fullscreen';

export default function LiveTest() {
  const isStarted = useSelector(store => store.liveTest.isStarted)
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);

  function handleStartTest() {
    dispatch(startTest(id));
    enableFullscreen();
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      return event.returnValue = "Do you want to end the test, you may not be able to give this test again"; // Required for Chrome
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>
    {!isStarted && <div className='max-w-[800px] mx-auto h-screen'>
      <h1 className='text-center grow my-10'>Do You Want to Start the Test ?</h1>
      <h2>Instructions</h2>
      <button className='block mx-auto bg-green-500 text-white mt-10 rounded-lg shadow-md shadow-green-500 border-2' onClick={handleStartTest}>Start Test</button>
    </div>}
    {isCompleted && <ModalEndExam message="Exam has ended, kindly submit the exam!" />}
    {isStarted && <div className="mx-4 lg:mx-auto flex h-screen">
      <TestSidebar />
      <div className={`grow px-8 py-20`}>
        <Information setter={setIsCompleted} />
        <Question />
      </div>
    </div>}
  </>
}



function Question() {
  const { activeQuestion, userResponses, activeQuestionNo } = useSelector(store => store.liveTest)
  const options = useSelector(store => store.liveTest.activeQuestion.options);
  const [selectedOption, setSelectedOption] = useState();
  const dispatch = useDispatch();

  function toggleAnswer(id) {
    setSelectedOption(id);
  }

  function handleSaveAnswer() {
    dispatch(saveCurrentAnswer(selectedOption))
    setSelectedOption();
  }

  function handleNextQues() {
    setSelectedOption();
    dispatch(goToNextQuestion());
  }

  function handlePreviousQues() {
    dispatch(goToPreviousQuestion());
    setSelectedOption();
  }

  useEffect(function () {
    // console.log(userResponses, userResponses[activeQuestionNo - 1]);
    setSelectedOption(userResponses[activeQuestionNo - 1])
  }, [activeQuestionNo])

  return <div className="mt-10">
    <h1>{activeQuestion.title}</h1>

    {options?.map(option =>
      <div key={option._id} className={`my-2 border-2 p-4 flex items-center gap-4 cursor-pointer rounded-md`}>
        <input
          type="radio"
          className="w-5 aspect-square"
          checked={selectedOption === option.id}
          onChange={() => toggleAnswer(option.id)}
        />
        <p className="font- text-[20px]">{option.value}</p>
      </div>
    )}

    <div className="text-right mt-10">
      <button className="bg-[#CCCCCC] rounded-md mx-2" onClick={handlePreviousQues}>Previous</button>
      <button className="bg-[#ADD8E6] rounded-md mx-2" onClick={handleNextQues}>Skip</button>
      <button className="bg-[#00FF00] rounded-md mx-2" onClick={handleSaveAnswer}>Save</button>
    </div>
  </div>
}