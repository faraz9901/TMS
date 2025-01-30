import { Project as ProjectType } from '@/types'
import { Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Status } from './Status'

const Project = ({ project }: { project: ProjectType }) => {
    const user_id = JSON.parse(localStorage.getItem("user") || "")._id

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        window.history.replaceState({}, '', `?delete=${project._id}`); // adding the project id to the url 
        const dialog = document.getElementById("confirm-dialog") as HTMLDialogElement
        dialog?.showModal()
    }

    return (
        <Link href={`/home/projects/${project._id}`} className='bg-white p-4   hover:scale-105 duration-300 active:scale-100 rounded-md shadow-md flex flex-col gap-4'>
            <h3 className='text-lg font-bold'>{project.project_name}</h3>
            <p className='text-sm text-gray-500'>{project.description}</p>

            <div className='flex gap-2 justify-between items-center'>

                <Status status={project.status} />

                {/*  showing the delete button if the project is created by the user */}
                {project.owner === user_id && <button onClick={onDelete} className=' btn-outline btn btn-sm btn-error' ><Trash size={15} /></button>}
            </div>

        </Link>
    )
}


export default function Collection({ name, projects }: { name: string, projects: ProjectType[] }) {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{name} ({projects.length}) </h2>
            <div className='grid grid-cols-3 gap-4'>
                {projects.map((project) => <Project key={project._id} project={project} />)}
            </div>
        </div>
    )
}
