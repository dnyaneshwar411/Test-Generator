export default function TestInfo({ test, index }) {
  return <div className="my-4">
    <p className="leading-3 font-semibold">{index + 1}&#41; {test.title} - {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
    <span className="text-slate-400 text-[12px]">LSAT Study / {test.questions.length} problems</span>
    {/* </div> */}
  </div>
}