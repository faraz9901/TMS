"use client"
import { getTask } from '@/actions/task.service'
import Loader from '@/components/Loader'
import { StatusChanger } from '@/components/Status'
import { Project, Task } from '@/types'
import { showErrorToast } from '@/utils'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ShowTask() {
    const params = useParams<{ project_id: string, task_id: string }>()

    const [loading, setLoading] = React.useState(false)
    const [task, setTask] = React.useState<Task | null>(null)

    // declaring the project variable for easy access
    const project = task?.project as Project

    const fetchTask = async () => {
        setLoading(true)

        const { data, error } = await getTask(params.project_id, params.task_id)

        if (error) showErrorToast(error)

        if (data) setTask(data.content)

        setLoading(false)
    }


    React.useEffect(() => {
        fetchTask()
    }, [])

    if (loading) return <Loader />

    if (!task) return <div className='text-2xl h-60 flex justify-center items-center'>Task not found</div>

    return (
        <div>
            <div className='flex flex-col gap-5 p-3'>
                <h2 className='text-3xl font-bold'> {project.project_name}</h2>

                <div className='flex gap-10 items-end'>
                    <h3 className='text-2xl font-bold'>{task.task_name}</h3>
                    <StatusChanger initialStatus={task.status} projectId={project._id} statusOf="Task" />
                </div>

                <p>
                    {task.description}
                </p>
            </div>
        </div>
    )
}
