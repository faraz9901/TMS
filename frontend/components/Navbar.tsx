"use client"
import React from 'react'
import { AlignJustify, Search } from 'lucide-react'

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user") || "")

    return (
        <>
            <div className="navbar shadow-md bg-gradient-to-b from-slate-50 to-slate-100 w-full justify-between">

                <h1>
                    Hello {user?.username || ""},
                </h1>



                <div className='flex gap-5 items-center'>
                    <label className="input input-bordered flex items-center gap-2">
                        <Search size={15} />
                        <input type="text" className="grow" placeholder="Search your projects" />
                    </label>
                </div>




                {/* Button to open the sidebar in mobile view */}
                <label htmlFor="sidebar" className="lg:hidden">
                    <AlignJustify />
                </label>
            </div>
        </>
    )
}
