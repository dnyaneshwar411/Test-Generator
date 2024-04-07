import user from "/user.png";

export default function UserInfo() {
  return <div className="flex items-center gap-2">
    <img src={user} className="w-12 h-12 object-cover" />
    <div>
      <h3 className="leading-5 text-xl font-semibold">User Name</h3>
      <p className="text-slate-400">Free Account</p>
    </div>
  </div>
};
