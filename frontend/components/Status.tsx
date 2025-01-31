"use client"
import { updateProjectStatus } from '@/actions/projects.service'
import { updateTaskStatus } from '@/actions/task.service'
import { STATUS } from '@/types'
import { ChevronDown } from 'lucide-react'
import React from 'react'

export function Status({ status }: { status: STATUS }) {

    if (!status) return null

    if (status === STATUS.DONE) {
        return (
            <div className='badge badge-success font-bold text-white p-3'>DONE</div>
        )
    }


    if (status === STATUS.TODO) {
        return (
            <div className='badge bg-slate-200 font-bold text-gray-600  p-3'>TODO</div>
        )
    }


    if (status === STATUS.IN_PROGRESS) {
        return (
            <div className='badge bg-blue-500 text-nowrap font-bold text-white p-3'>IN PROGRESS</div>
        )
    }

}


export function StatusChanger({ projectId, initialStatus, statusOf, taskId }: { projectId: string, initialStatus: STATUS, statusOf: "Task" | "Project", taskId?: string }) {

    const [status, setStatus] = React.useState<STATUS>(initialStatus)
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const possibleStatus = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE]

    const handleStatusChange = async (changedStatus: STATUS) => {
        setLoading(true)
        setIsDropDownOpen(false)

        if (statusOf === "Task" && taskId) {

            const { error } = await updateTaskStatus(projectId, taskId, changedStatus)

            if (!error) setStatus(changedStatus) // if there is no error then update the status
        }

        if (statusOf === "Project") {

            const { error } = await updateProjectStatus(projectId, changedStatus)

            if (!error) setStatus(changedStatus) // if there is no error then update the status
        }

        setLoading(false)
    }


    return (

        <div className='relative'>

            <button disabled={loading} onClick={() => setIsDropDownOpen(!isDropDownOpen)} className='bg-transparent flex items-end '>

                <Status status={status} />

                <ChevronDown />

                {loading && <span className="loading loading-dots loading-sm"></span>}

            </button>

            <ul className={'absolute w-32 bg-white flex flex-col gap-3 p-2 rounded-md shadow-md ' + (isDropDownOpen ? 'block' : 'hidden')} >
                {
                    possibleStatus.map((item) => {
                        if (item === status) return null

                        return (
                            <li key={item} className='bg-white  hover:scale-105 cursor-pointer' onClick={() => handleStatusChange(item)}>
                                <Status status={item} />
                            </li>
                        )
                    })
                }

            </ul>
        </div >


    )
}
