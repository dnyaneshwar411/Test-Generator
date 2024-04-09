import { Link } from "react-router-dom";

export default function ForgotLink() {
  return <Link to="/user/forgot-password">
    <p className="text-slate-400 text-center my-2 font-semibold cursor-pointer select-none">
      <em>Forgot your password?</em>
    </p>
  </Link>
}