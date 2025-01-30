import React from 'react'
import Input from '../Input'
import { X } from 'lucide-react'
import { Project } from '@/types'
import { createTask } from '@/actions/task.service'
import { getErrorMessage } from '@/utils'


const initialValues = {
    task_name: "",
    description: "",
}

export default function CreateTask({ project, onSuccess }: { project: Project, onSuccess: () => void }) {

    const [formStatus, setFormStatus] = React.useState("")
    const [taskData, setTaskData] = React.useState({ ...initialValues, project: project._id })
    const [error, setError] = React.useState("")

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        setTaskData({ ...taskData, [name]: value })
    }

    const onClose = () => {
        const dialog = document.getElementById("create-task") as HTMLDialogElement || null
        dialog?.close()
        setError("")
        setTaskData({ ...initialValues, project: project._id })
    }

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus("loading")
        const { error } = await createTask(taskData)

        if (error) {
            setFormStatus("")
            setError(getErrorMessage(error))
            return
        }

        setFormStatus("")
        onClose()
        onSuccess()
    }

    return (
        <dialog id="create-task" className="modal">
            <div className="modal-box flex flex-col gap-5  max-w-5xl">

                <div className='flex justify-between'>
                    <h3 className='text-2xl font-bold'>Create Task</h3>
                    <button onClick={onClose} className='btn btn-sm'><X /></button>
                </div>

                <form onSubmit={onFormSubmit} className='grid grid-cols-3 gap-8 w-full items-center'>

                    <label>  Task Name </label>
                    <Input type="text" className='col-span-2' required name="task_name" disabled={formStatus === "loading"} onChange={handleFormData} value={taskData.task_name} />

                    <label> Description</label>
                    <textarea required name="description" disabled={formStatus === "loading"} onChange={handleFormData} value={taskData.description} rows={5} className="textarea textarea-bordered col-span-2" placeholder='Explain briefly what is the purpose of the task' ></textarea>


                    {error && <p className='col-span-3 text-red-500 text-center'>{error}</p>}

                    <div className='col-span-3 flex justify-end'>
                        <button disabled={formStatus === "loading"} className='btn  btn-neutral'>
                            {formStatus === "loading" && <span className="loading loading-spinner loading-sm"></span>}
                            {formStatus === "loading" ? "Creating..." : "Create"}
                        </button>
                    </div>

                </form>
            </div>
        </dialog>
    )
}
