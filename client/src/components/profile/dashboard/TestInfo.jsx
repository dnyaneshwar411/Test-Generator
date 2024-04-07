export default function TestInfo({ test }) {
  return <div className="flex items-start gap-2 my-4">
    <input type="checkbox" className="w-5 aspect-square" />
    <div>
      <p className="leading-3">{test.title} - {test.availableAt.substring(0, 10).split("-").join(" / ")}</p>
      <span className="text-slate-400 text-[12px]">LSAT Study / {test.questions.length} problems</span>
    </div>
  </div>
}