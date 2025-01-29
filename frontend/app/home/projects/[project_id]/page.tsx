"use client"
import { getProject } from '@/actions/projects.service'
import { Project } from '@/types'
import { showErrorToast } from '@/utils'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProjectPage() {
    const params = useParams()
    const [project, setProject] = React.useState<Project | null>(null)




    React.useEffect(() => {
        const fetchProject = async () => {

            const { data, error } = await getProject(params.project_id as string)

            if (error) return showErrorToast(error)

            setProject(data.content)
        }

        fetchProject()
    }, [])


    if (!project) return (
        <div className='flex justify-center items-center min-h-56'>
            <p>Cannot fetch the project</p>
        </div>
    )


    return (
        <div className='flex flex-col gap-5 p-5'>
            <h2 className='text-2xl font-bold'>{project?.project_name}</h2>

            <p>
                {project?.description}
            </p>

            <div className=' flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Tasks</h4>

                <div className="tooltip  tooltip-top" data-tip="Add a task">
                    <button className="btn"><Plus /></button>
                </div>

            </div>

            <div>
                {project.tasks.length === 0 && (
                    <div className='flex justify-center items-center text-gray-400 min-h-56'>
                        There are no tasks in this project
                    </div>
                )}
            </div>


        </div >
    )
}
