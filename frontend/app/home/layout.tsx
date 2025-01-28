import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "T M S",
    description: "A simple task management system using Next.js",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open">
            <input id="sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Main Page Content Here */}
                <Navbar />
                <main className=" min-h-[88vh] bg-gradient-to-b  from-slate-50 to-slate-100">
                    {children}
                </main>
            </div>

            <div className="drawer-side">
                <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu  bg-gradient-to-b from-slate-100 to-slate-300  min-h-full lg:w-80 p-4">
                    {/* Sidebar content here */}
                    <Sidebar />
                </ul>
            </div>
        </div>
    )
}