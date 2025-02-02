"use client"
import React from 'react'
import { AlignJustify, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const router = useRouter()
    const [search, setSearch] = React.useState("")
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        if (value === "") router.push("/home")  // to reset collections
        if (value.length > 3) router.push(`/home?search=${value}`) // atleast need three characters to search
        setSearch(e.target.value)
    }

    return (
        <>
            <div className="navbar shadow-md bg-gradient-to-b from-slate-50 to-slate-100 w-full justify-between">

                <h1>
                    Hello {user?.username || ""},
                </h1>



                <div className='flex gap-5 items-center'>
                    <label className="input input-bordered flex items-center gap-2">
                        <Search size={15} />
                        <input type="text" className="grow" value={search} onChange={handleSearch} placeholder="Search your projects" />
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

