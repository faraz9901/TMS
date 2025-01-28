import { Project } from '@/types'
import React from 'react'

export default function Collection({ name, projects }: { name: string, projects: Project[] }) {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>{name} ({projects.length}) </h2>
            <div className='grid grid-cols-3 gap-4'>
                {projects.map((project) => (
                    <div key={project._id} className='bg-white p-4 rounded-md shadow-md flex flex-col gap-2'>
                        <h3 className='text-lg font-bold'>{project.project_name}</h3>
                        <p className='text-sm text-gray-500'>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
