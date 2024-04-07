import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  async function signup({ name, email, password, division, confirmPassword }) {
    const info = handleInputErrors({ name, email, password, division, confirmPassword });
    if (!info.status) return info
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword, division }),
      });
      const data = await response.json()
      localStorage.setItem("user", JSON.stringify(data))
      dispatch({ type: "user/logInUser", payload: data });
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }


  return { loading, signup };
}

function handleInputErrors({ name, email, password, division, confirmPassword }) {
  if (!name || !email || !password || !division || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!MAIL_REGEX.test(email)) return { status: false, message: "Email should be of the format ...@gmail.com" };
  // if (!PASS_REGEX.test(password)) return { status: false, message: "Password should contain at least one number, special character and an alphabet" };

  if (password !== confirmPassword) {
    toast.error("");
    return { status: false, message: "Passwords do not match" };
  }

  if (password.length < 6) {
    toast.error("");
    return { status: false, message: "Password must be at least 6 characters" };
  }

  return { status: true };
}