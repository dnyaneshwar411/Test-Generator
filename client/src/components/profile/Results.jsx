import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Results() {
  return <div>
    <div className="relative bg-[#F5F0E5] border-2 p-2 text-[#A1824A] rounded-xl">
      <label htmlFor="search">
        <MagnifyingGlassIcon className="icon-lg absolute top-1/2 translate-y-[-50%] left-3" />
      </label>
      <input type="text" id="search" className="w-full bg-transparent pl-8" placeholder="search for test" />
    </div>

    <div className="flex flex-wrap gap-4 mt-10 justify-eenly">


      <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to="/results/0123">
          <h3>TEST1</h3>
        </NavLink>
      </div>

      <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to="/results/456">
          <h3>TEST2</h3>
        </NavLink>
      </div>

      <div className="bg-[#f5f0e5] grow p-4 rounded-lg w-full md:w-[49%] sm:max-w-[350px]">
        <NavLink to="/results/789">
          <h3>TEST3</h3>
        </NavLink>
      </div>
    </div>
  </div>
};