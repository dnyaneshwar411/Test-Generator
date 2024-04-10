import { useState } from "react";
const PASS_REGEX = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

export default function useUpdatePassword() {
  const [loading, setLoading] = useState(false);

  async function updatePassword(password, cpassword, email) {
    try {
      const success = handleInputErrors(password, cpassword);
      if (!success.status) return { status: false, payload: success.payload };

      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, cpassword, email })
      });
      const data = await response.json();
      return { status: true, payload: data };
    } catch (error) {
      return { status: false, payload: error.message };
    } finally {
      setLoading(false);
    }
  }

  return { loading, updatePassword };
}

function handleInputErrors(password, cpassword) {
  if (password.length <= 8) return { status: false, payload: "Password size should be at least 8 characters" };

  if (!PASS_REGEX.test(password)) return { status: false, payload: "Password should contain at least one small, one capital alphabet, one number and a special character" };

  if (password !== cpassword) return { status: false, payload: "Passwords should match" };

  return { status: true }
}