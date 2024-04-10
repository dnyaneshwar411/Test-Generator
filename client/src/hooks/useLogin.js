import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkIfUserLoggedIn } from "../redux/store";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  async function login({ email, password }) {
    const success = handleInputErrors(email, password);
    if (!success.status) return { status: false, payload: success.payload };
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 400) return { status: false, payload: data.error }
      localStorage.setItem("user", JSON.stringify({ ...data, type: "user" }))
      dispatch(checkIfUserLoggedIn());
      return { status: true }
    } catch (error) {
      toast.error(error.message);
      return { status: false, payload: error.error };
    } finally {
      setLoading(false);
    }
  }

  async function loginAdmin({ email, password }) {
    const success = handleInputErrors(email, password);
    if (!success.status) return { status: false, payload: success.payload };
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);

      if (data.error) throw new Error(data.error);
      if (res.status === 400) return { status: false, payload: data.error }
      localStorage.setItem("user", JSON.stringify({ ...data, type: "admin" }))
      dispatch(checkIfUserLoggedIn());
      return { status: true }
    } catch (error) {
      toast.error(error.message);
      return { status: false, payload: error.error }
    } finally {
      setLoading(false);
    }
  }

  return { loading, login, loginAdmin };
}

function handleInputErrors(email, password) {
  if (!email || !password) {
    return { status: false, payload: "Please fill in all fields" };
  }
  return { status: true };
}