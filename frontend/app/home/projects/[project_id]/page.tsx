"use client"
import { getProject } from '@/actions/projects.service'
import EditProject from '@/components/EditProject'
import { Status, StatusChanger } from '@/components/Status'
import CreateTask from '@/components/Task/CreateTask'
import { Project } from '@/types'
import { showErrorToast, showSuccessToast } from '@/utils'
import { Pencil, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProjectPage() {
    const params = useParams()
    const [project, setProject] = React.useState<Project | null>(null)

    const fetchProject = async () => {

        const { data, error } = await getProject(params.project_id as string)

        if (error) return showErrorToast(error)

        setProject(data.content)
    }

    React.useEffect(() => {
        fetchProject()
    }, [])

    const showEditModal = () => {
        const dialog = document.getElementById("edit-project") as HTMLDialogElement || null
        dialog?.showModal()
    }

    const onEditSuccess = () => {
        showSuccessToast("Project updated successfully")
        fetchProject() // refreshing the project
    }

    const showCreateTask = () => {
        const dialog = document.getElementById("create-task") as HTMLDialogElement || null
        dialog?.showModal()
    }


    if (!project) return (
        <div className='flex justify-center items-center min-h-56'>
            <p>Cannot fetch the project</p>
        </div>
    )


    return (
        <div className='flex flex-col gap-5 p-5'>

            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <h2 className='text-2xl font-bold'>
                        {project?.project_name}
                    </h2>

                    <StatusChanger projectId={project?._id} initialStatus={project?.status} statusOf="Project" />
                </div>


                <div className="tooltip  tooltip-top" data-tip="Edit project">
                    <button onClick={showEditModal} className="btn btn-sm btn-primary"><Pencil size={20} /></button>
                </div>
            </div>


            <p>
                {project?.description}
            </p>



            <div className=' flex justify-between items-center'>
                <h4 className='text-xl font-semibold'>Tasks</h4>

                <div className="tooltip  tooltip-top" data-tip="Add a task">
                    <button onClick={showCreateTask} className="btn btn-sm"><Plus size={20} /></button>
                </div>

            </div>

            <div>
                {project?.tasks?.length === 0 && (
                    <div className='flex justify-center items-center text-gray-400 min-h-56'>
                        There are no tasks in this project
                    </div>
                )}
            </div>

            <EditProject project={project} onEditSuccess={onEditSuccess} />
            <CreateTask project={project} />
        </div >
    )
}
