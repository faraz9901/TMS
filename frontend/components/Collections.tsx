import { getCollections } from '@/actions/projects.service'
import React from 'react'

export default async function Collections() {

    const { data, error } = await getCollections(3)


    const mydata = [
        { id: 1, name: "Collection 1", description: "Description 1" },
        { id: 2, name: "Collection 2", description: "Description 2" },
        { id: 3, name: "Collection 3", description: "Description 3" },
        { id: 3, name: "Collection 3", description: "Description 3" },
        { id: 3, name: "Collection 3", description: "Description 3" },
        { id: 3, name: "Collection 3", description: "Description 3" },
    ]


    return (
        <div className='h-56 flex items-center gap-3 justify-center p-2'>

            {/* if error dont show any thing */}
            {/* {error ? <span>Error fetching collections</span> : null} */}

            {/* if data is not null show the data */}

            {mydata && mydata.splice(0, 3).map((collection: any) => (
                <div key={collection.id} className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{collection.name}</h2>
                        <p>{collection.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    )
}
