import { Metadata } from "next";

export const metadata: Metadata = {
    title: "T M S",
    description: "A simple task management system using Next.js",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen justify-center items-center bg-gradient-to-b from-slate-600 to-slate-800">
            <div className="w-1/3 bg-white p-5 rounded-md shadow-lg" >
                {children}
            </div>
        </div>
    )
}