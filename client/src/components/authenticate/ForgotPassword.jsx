const inputStyles = "w-full p-3 mt-2 mb-4 focus:outline-none border-2 rounded-md";
const labelStyles = "font-semibold";

export default function ForgotPassword() {
  return <div>
    <label htmlFor="email" className={labelStyles}>Enter Email ID</label>
    <input type="text" id="email" placeholder="Email" className={inputStyles} />
    <button className="btn-primary w-full mt-4 rounded-md">Send Otp</button>
  </div>
};