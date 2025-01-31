"use client"
import { getProject } from '@/actions/projects.service'
import { deleteTask } from '@/actions/task.service'
import ConfirmDialog from '@/components/ConfirmDialog'
import EditProject from '@/components/EditProject'
import Loader from '@/components/Loader'
import { Status, StatusChanger } from '@/components/Status'
import CreateTask from '@/components/Task/CreateTask'
import { Project, Task as TaskType } from '@/types'
import { showErrorToast, showSuccessToast } from '@/utils'
import { Pencil, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function ProjectPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const [project, setProject] = React.useState<Project | null>(null)
    const [loading, setLoading] = React.useState(false)

    //checking if the user is the owner of the project
    const isOwner = project?.owner === JSON.parse(localStorage.getItem("user") || "{}")._id

    const fetchProject = async () => {
        setLoading(true)
        const { data, error } = await getProject(params.project_id as string)
        setLoading(false)
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
        showSuccessToast("Project updated")
        fetchProject() // refreshing the project
    }

    const onTaskCreationSuccess = () => {
        showSuccessToast("Task created")
        fetchProject() // refreshing the project
    }

    const handleDeleteProject = async () => {

        const taskId: string = searchParams.get("delete") || ""

        if (!taskId) return

        const dialog = document.getElementById("confirm-dialog") as HTMLDialogElement || null

        dialog?.close()

        const { error } = await deleteTask(taskId, project?._id || "")

        if (error) return showErrorToast(error)

        showSuccessToast("Task deleted")

        removeQueryFromUrl()

        fetchProject() // refreshing the collections
    }

    const removeQueryFromUrl = () => {
        const newURL = window.location.pathname; // Just the path, no query
        window.history.replaceState(null, '', newURL)   //reseting the url
    }

    const showCreateTask = () => {
        const dialog = document.getElementById("create-task") as HTMLDialogElement || null
        dialog?.showModal()
    }

    if (loading) return <Loader />

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

                {/* if no tasks are there */}
                {!project.tasks?.length &&
                    <div className='flex justify-center items-center text-gray-400 min-h-56'>
                        There are no tasks in this project
                    </div>
                }

                {/* if tasks are there */}
                <div className='flex flex-col gap-4'>
                    {
                        project?.tasks?.map((task) =>
                            <Task
                                key={task._id}
                                task={task}
                                showDeleteButton={isOwner} // show delete button if the owner is viewing it
                            />
                        )
                    }
                </div>


            </div>

            <EditProject project={project} onEditSuccess={onEditSuccess} />
            <CreateTask project={project} onSuccess={onTaskCreationSuccess} />

            <ConfirmDialog
                confirmMessage='Are you sure you want to delete this task'
                confirmText='Delete'
                confirmBtnClassName='btn text-white btn-sm btn-error'
                onConfirm={handleDeleteProject}
                onClose={removeQueryFromUrl}
            />

        </div >
    )
}



const Task = ({ task, showDeleteButton }: { task: TaskType, showDeleteButton?: boolean }) => {
    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        window.history.replaceState({}, '', `?delete=${task._id}`); // adding the task id to the url 
        const dialog = document.getElementById("confirm-dialog") as HTMLDialogElement
        dialog?.showModal()
    }

    return (
        <Link href={`/home/projects/${task.project}/${task._id}`} className='flex border  hover:bg-gray-200 rounded-md p-3 cursor-pointer justify-between items-center '>
            <div className='flex gap-2 items-center'>
                <p>{task.task_name}</p>
            </div>

            <div className='flex items-center gap-4'>

                <Status status={task.status} />

                {/* show delete button if the owner is viewing it */}
                {showDeleteButton && <button onClick={onDelete} className="btn btn-sm btn-error btn-outline"><Trash size={20} /></button>}

            </div>

        </Link>
    )
}