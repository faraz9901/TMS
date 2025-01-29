import React from 'react'

export default function Project({ params }: { params: { project_id: string } }) {
    return (
        <div>{params.project_id}</div>
    )
}
