import type { Metadata } from "next";
import "./globals.css";
import { HamburgerIcon } from "@/components/icons";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Task Management System",
  description: "A simple task management system using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Main Page Content Here */}

            <Navbar />

            {children}

            <ToastContainer
              position="bottom-right"
            />
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu  bg-gray-900 text-base-content min-h-full lg:w-80 p-4">
              {/* Sidebar content here */}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
