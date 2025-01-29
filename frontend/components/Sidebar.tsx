import { Plus, Users } from 'lucide-react'
import Link from 'next/link'
import path from 'path'
import React from 'react'

const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Link href={href} className='flex items-center gap-5 cursor-pointer'>
            {children}
        </Link>
    )
}


export default function Sidebar() {
    return (
        <div className=' flex flex-col gap-10'>

            <Link href='/home' className='text-2xl flex gap-5 items-center font-bold'>
                <Users />  TMS
            </Link>

            <NavItem href='/home/create-project'>
                <button className=''>
                    <Plus size={20} />
                </button>
                <span>
                    Create new project
                </span>
            </NavItem>
        </div>
    )
}
