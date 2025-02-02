"use client"
import { deleteProject, getProjects } from '@/actions/projects.service'
import Collection from '@/components/Collection'
import ConfirmDialog from '@/components/ConfirmDialog'
import Loader from '@/components/Loader'
import { Project } from '@/types'
import { showErrorToast, showSuccessToast } from '@/utils'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface CollectionType {
    name: string
    projects: Project[]
}

export default function Collections() {
    const [collections, setCollections] = React.useState([])
    const [loading, setLoading] = React.useState("")
    const searchParams = useSearchParams()
    const search = searchParams.get("search") || ""  // getting the search query

    const handleDeleteProject = async () => {

        const projectId: string = searchParams.get("delete") || ""

        if (!projectId) return

        const dialog = document.getElementById("confirm-dialog") as HTMLDialogElement || null

        dialog?.close()

        const { error } = await deleteProject(projectId)

        if (error) return showErrorToast(error)

        showSuccessToast("Project deleted")

        removeQueryFromUrl()

        getCollections() // refreshing the collections
    }

    const removeQueryFromUrl = () => {
        const newURL = window.location.pathname; // Just the path, no query
        window.history.replaceState(null, '', newURL)   //reseting the url
    }

    const getCollections = async () => {
        setLoading("loading")
        const { data, error } = await getProjects(search)

        if (data) {
            setCollections(data.content)

        }

        if (error) {
            showErrorToast(error)
        }
        setLoading("")
    }


    React.useEffect(() => {
        getCollections()
    }, [search])

    if (loading) return <Loader />


    return (
        <div className='flex flex-col gap-10 p-3 hide-scrollbar'>


            <h2 className='text-3xl flex gap-1  font-bold'>
                Collections
                <span className='text-gray-500 ' >
                    ({collections?.length})
                </span>
            </h2>

            {collections?.map((collection: CollectionType) => <Collection key={collection.name} name={collection.name} projects={collection.projects} />)}

            <ConfirmDialog
                confirmMessage='Are you sure you want to delete this project'
                confirmText='Delete'
                confirmBtnClassName='btn text-white btn-sm btn-error'
                onConfirm={handleDeleteProject}
                onClose={removeQueryFromUrl}
            />
        </div>
    )
}
