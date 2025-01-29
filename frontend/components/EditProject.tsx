import { Project } from '@/types'

import React from 'react'
import Input from './Input'
import { X } from 'lucide-react'
import { updateProject } from '@/actions/projects.service'
import { getErrorMessage } from '@/utils'

export default function EditProject({ project, onEditSuccess }: { project: Project, onEditSuccess?: () => void }) {

    const [formStatus, setFormStatus] = React.useState("")
    const [projectData, setProjectData] = React.useState(project)
    const [error, setError] = React.useState("")

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        setProjectData({ ...projectData, [name]: value })
    }

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!(projectData.collection_name && projectData.project_name && projectData.description)) return setError("Fill all the fields")

        setFormStatus("loading")

        // Take out the data from the project
        const data = {
            collection_name: projectData.collection_name,
            project_name: projectData.project_name,
            description: projectData.description
        }

        // Update Project 
        const { error } = await updateProject(project._id, data)

        if (error) {
            setFormStatus("")
            setError(getErrorMessage(error))
            return
        }

        // Close the modal and show the success toast
        onClose()
        onEditSuccess?.()
    }

    const onClose = () => {
        const dialog = document.getElementById("edit-project") as HTMLDialogElement || null
        dialog?.close()
        setFormStatus("")
        setError("")
    }

    return (
        <dialog id="edit-project" className="modal">
            <div className="modal-box flex flex-col gap-5  max-w-5xl">

                <div className='flex justify-between'>
                    <h3 className="font-bold text-xl">{project.project_name}</h3>
                    <button onClick={onClose} className='btn btn-sm'><X /></button>
                </div>

                <form onSubmit={onFormSubmit} className='grid grid-cols-3 gap-8 w-full items-center'>

                    <label> Name of the collection </label>
                    <Input type="text" className='col-span-2' required name="collection_name" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.collection_name} />

                    <label> Name of the project </label>
                    <Input type="text" className='col-span-2' required name="project_name" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.project_name} />

                    <label> Description</label>
                    <textarea required name="description" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.description} rows={5} className="textarea textarea-bordered col-span-2" placeholder='Explain briefly what is the purpose of the project' ></textarea>


                    {error && <p className='col-span-3 text-red-500 text-center'>{error}</p>}

                    <div className='col-span-3 flex justify-end'>
                        <button disabled={formStatus === "loading"} className='btn  btn-neutral'>
                            {formStatus === "loading" && <span className="loading loading-spinner loading-sm"></span>}
                            {formStatus === "loading" ? "Updating..." : "Update"}
                        </button>
                    </div>

                </form>
            </div>
        </dialog>
    )
}
