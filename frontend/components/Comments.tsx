import React from 'react'
import Loader from './Loader'
import { getAllComments } from '@/actions/task.service'
import { showErrorToast } from '@/utils'
import { Plus, SendHorizontal } from 'lucide-react'
import Input from './Input'

export default function Comments({ taskId }: { taskId: string }) {
    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState("")
    const [showAddComment, setShowAddComment] = React.useState(false)
    const [comment, setComment] = React.useState("")


    const fetchComments = async () => {
        setLoading("loading")

        const { data, error } = await getAllComments(taskId)

        if (data) setComments(data.content)

        if (error) showErrorToast(error)

        setLoading("")
    }

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading("sending")

        setTimeout(() => {
            setLoading("")
            setShowAddComment(false) // close the add comment form
        }, 4000)
    }

    React.useEffect(() => {
        fetchComments()
    }, [])


    if (loading === "loading") return <Loader />


    if (!comments.length) return <div className='text-xl h-60 flex justify-center text-gray-400 items-center'>No comments yet</div>


    return (
        <div className='flex flex-col gap-4 pe-10'>
            <div className='flex justify-between items-center '>
                <h3 className='text-lg font-bold'>Comments ({comments.length})</h3>

                <button disabled={showAddComment} onClick={() => setShowAddComment(true)} className='btn btn-sm btn-neutral text-white'><Plus size={12} /></button>
            </div>


            {showAddComment && (
                <form onSubmit={onFormSubmit} className='flex flex-col gap-2'>
                    <h3 className='font-bold flex gap-2'>
                        Add a comment

                        {/* showing the spinner if the comment is being sent */}
                        {loading === "sending" && <span className="loading loading-spinner loading-sm"></span>}
                    </h3>
                    <div className='flex'>
                        <Input name='comment' disabled={loading === "sending"} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="add your comment..." />
                        <button type='submit' disabled={loading === "sending"} className='btn btn-neutral text-white'><SendHorizontal size={15} /></button>
                    </div>
                </form>
            )}

            <ul className='flex flex-col gap-4'>
                {comments.map((comment: any) => (
                    <li key={comment._id} className='flex flex-col gap-2 items-start'>
                        <div className='flex gap-2 items-center'>
                            <span className=' font-bold'>{comment.posted_by?.username}</span>
                            <span className=' text-gray-400'>{comment.createdAt}</span>
                        </div>
                        <p className=''>{comment.message}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}
