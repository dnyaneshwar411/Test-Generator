import { Link } from "react-router-dom";
import { inputStyles, labelStyles } from "../../utils/data";
import ForgotLink from "../authenticate/ForgotLink";

export default function SignInAdmin() {
  function signIn(e) {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={signIn}>
        <label htmlFor="username" className={labelStyles}>Username</label>
        <input type="text" id="username" placeholder="user" className={inputStyles} />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="text" id="password" placeholder="password" className={inputStyles} />

        <div>
          <input type="checkbox" id="rememberMe" className="mr-2 cursor-pointer" />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">Remember Me</label>
        </div>

        <ForgotLink />

        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/admin/sign-up">
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </Link>
    </div >
  )
};