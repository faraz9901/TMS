"use client"
import { logOutUser } from '@/actions/user.service'
import { LogOut, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import React from 'react'

const NavItem = ({ href, currentPathName, children }: { href: string, currentPathName: string, children: React.ReactNode }) => {
    return (
        <Link href={href} className={'flex items-center active:scale-95 duration-150 px-2 py-3 rounded-md lg:gap-5 gap-1  cursor-pointer ' + (currentPathName === href ? 'bg-slate-700 text-white' : '')}>
            {children}
        </Link>
    )
}


export default function Sidebar() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        return href === pathname
    }


    return (
        <aside className=' flex flex-col gap-10'>

            <Link href='/home' className='text-2xl flex gap-5 items-center font-bold'>
                <Users />  TMS
            </Link>
            <div className='flex flex-col gap-3'>
                <NavItem href='/home/create-project' currentPathName={pathname}>
                    <Plus size={20} />
                    Create new project
                </NavItem>

                <div onClick={logOutUser} className='flex items-center active:scale-95 duration-150 px-2 py-3 rounded-md lg:gap-5 gap-1  cursor-pointer'>
                    <LogOut size={20} />
                    Logout
                </div>
            </div>
        </aside>
    )
}
