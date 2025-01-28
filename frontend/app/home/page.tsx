"use client"
import { getProjects } from '@/actions/projects.service'
import Collection from '@/components/Collection'
import Loader from '@/components/Loader'
import { Project } from '@/types'
import { showErrorToast } from '@/utils'
import React from 'react'

interface Collection {
    name: string
    projects: Project[]
}

export default function Collections() {
    const [collections, setCollections] = React.useState([])
    const [loading, setLoading] = React.useState("")


    React.useEffect(() => {
        const getCollections = async () => {

            setLoading("loading")

            const { data, error } = await getProjects()


            if (data) {
                setCollections(data.content)
            }

            if (error) {
                showErrorToast(error)
            }

            setTimeout(() => setLoading(""), 1000)
        }

        getCollections()
    }, [])

    if (loading) return <Loader />


    return (
        <div className='flex flex-col gap-10 p-3 '>

            {collections?.map((collection: Collection) => <Collection key={collection.name} name={collection.name} projects={collection.projects} />)}









        </div>
    )
}
