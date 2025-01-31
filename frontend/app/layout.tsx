import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "T M S",
  description: "A simple task management system using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-gray-700">
        {children}
        <ToastContainer
          position="bottom-right"
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </body>
    </html>
  );
}
