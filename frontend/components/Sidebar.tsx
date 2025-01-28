import { Plus, Users } from 'lucide-react'
import React from 'react'

const NavItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex items-center gap-5 cursor-pointer'>
            {children}
        </div>
    )
}


export default function Sidebar() {
    return (
        <div className=' flex flex-col gap-10'>

            <h2 className='text-2xl flex gap-5 items-center font-bold'>
                <Users />  TMS
            </h2>

            <NavItem>
                <button className=''>
                    <Plus size={20} />
                </button>
                <span>
                    Create new collection
                </span>
            </NavItem>







        </div>
    )
}
