"use client"
import { getProjects } from '@/actions/projects.service'
import Collection from '@/components/Collection'
import Loader from '@/components/Loader'
import { Project } from '@/types'
import { showErrorToast } from '@/utils'
import React from 'react'

interface CollectionType {
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
        <div className='flex flex-col gap-10 p-3 hide-scrollbar'>


            <h2 className='text-3xl flex gap-1  font-bold'>
                Collections
                <span className='text-gray-500 ' >
                    ({collections?.length})
                </span>
            </h2>

            {collections?.map((collection: CollectionType) => <Collection key={collection.name} name={collection.name} projects={collection.projects} />)}









        </div>
    )
}
