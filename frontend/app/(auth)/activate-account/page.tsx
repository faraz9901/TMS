"use client"
import { requestEmail } from '@/actions/user.service'
import Input from '@/components/Input'
import { showErrorToast, showSuccessToast } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
    const [email, setEmail] = React.useState("")
    const router = useRouter()
    const [formStatus, setFormStatus] = React.useState("")

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) return showErrorToast({ message: "Email is required" })

        const { error } = await requestEmail(email)

        if (error) return showErrorToast(error)

        showSuccessToast("Email sent ! Please check your email")

        return router.push("/login")
    }

    return (
        <form onSubmit={onFormSubmit} className='flex flex-col gap-4'>
            <h3 className='text-center text-xl font-semibold'>Activate your account</h3>
            <Input name="email" required disabled={formStatus === "loading"} type="email" placeholder="Type your email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            {formStatus === "loading" && <span className="loading loading-dots loading-md" > </span>}
            <button type="submit" disabled={formStatus === "loading"} className="btn btn-neutral w-full">Send Mail</button>
        </form>
    )
}
