// AppLayout.jsx
import Navbar from "../components/NavBar.jsx";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
