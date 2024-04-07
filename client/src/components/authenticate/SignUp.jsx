import { useState } from "react";
import { Link } from "react-router-dom";
import ForgotLink from "./ForgotLink";
import useSignup from "../../hooks/useSignup";
import Error from "../Error";

const inputStyles = "w-full p-3 mt-2 mb-4 focus:outline-none border-2 rounded-md";
const labelStyles = "font-semibold";

export default function SignUp() {
  const { signup } = useSignup();
  const [error, setError] = useState();

  async function signUp(e) {
    e.preventDefault();
    // console.log(e.target)
    try {
      const response = await signup({ name: e.target[0].value, email: e.target[1].value, password: e.target[3].value, division: e.target[2].value, confirmPassword: e.target[4].value })
      if (!response.status) setError(response.message)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <Error message={error} setter={setError} />}
      <form onSubmit={signUp}>
        <label htmlFor="name" className={labelStyles}>name</label>
        <input type="text" id="name" placeholder="name" className={inputStyles} />

        <label htmlFor="email" className={labelStyles}>email</label>
        <input type="email" id="email" placeholder="email" className={inputStyles} />

        <label htmlFor="division" className={labelStyles}>division</label>
        <input type="text" id="division" placeholder="division" className={inputStyles} />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="password" id="password" placeholder="password" className={inputStyles} />

        <label htmlFor="cpassword" className={labelStyles}>Confirm Password</label>
        <input type="password" id="cpassword" placeholder="confirm password" className={inputStyles} />

        <div>
          <input type="checkbox" id="rememberMe" className="mr-2 cursor-pointer" />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">Remember Me</label>
        </div>

        <ForgotLink />

        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/user">
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </Link>
    </div>
  )
}