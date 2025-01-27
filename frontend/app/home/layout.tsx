import Navbar from "@/components/Navbar";
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
                {children}
            </div>

            <div className="drawer-side">
                <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu  bg-gray-900 text-base-content min-h-full lg:w-80 p-4">
                    {/* Sidebar content here */}
                </ul>
            </div>
        </div>
    )
}