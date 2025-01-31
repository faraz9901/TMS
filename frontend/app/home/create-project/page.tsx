"use client"

import { createProject } from '@/actions/projects.service'
import Input from '@/components/Input'
import { showErrorToast, showSuccessToast } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CreateProject() {
    const router = useRouter()
    const [projectData, setProjectData] = React.useState({
        collection_name: "",
        project_name: "",
        description: ""
    })

    const [formStatus, setFormStatus] = React.useState("")

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        setProjectData({ ...projectData, [name]: value })
    }




    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!(projectData.collection_name && projectData.project_name && projectData.description)) return showErrorToast({ message: "Fill all the fields" })

        setFormStatus("loading")

        // Create Project
        const { error } = await createProject(projectData)

        if (error) {
            setFormStatus("")
            showErrorToast(error)
        }

        router.push("/home")
        showSuccessToast("Project created")

    }

    return (
        <div className='flex flex-col gap-10 p-3 justify-center items-center'>

            <h2 className='font-bold text-3xl'>Create a new project</h2>

            <form onSubmit={onFormSubmit} className='grid grid-cols-2 gap-10 w-5/6 items-center'>

                <label> Name of the collection </label>
                <Input type="text" required name="collection_name" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.collection_name} />

                <label> Name of the project </label>
                <Input type="text" required name="project_name" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.project_name} />

                <label> Description</label>
                <textarea required name="description" disabled={formStatus === "loading"} onChange={handleFormData} value={projectData.description} rows={5} className="textarea textarea-bordered" placeholder='Explain briefly what is the purpose of the project' ></textarea>

                <div className='col-span-2 flex justify-end'>
                    <button disabled={formStatus === "loading"} className='btn  btn-neutral'>
                        {formStatus === "loading" && <span className="loading loading-spinner loading-sm"></span>}
                        {formStatus === "loading" ? "Creating..." : "Create Project"}
                    </button>
                </div>

            </form>
        </div>
    )
}
