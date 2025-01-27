"use client"
import React from "react"
import { useRouter } from "next/navigation"

import { loginUser } from "@/actions/user.service"
import { showErrorToast, showSuccessToast } from "@/utils"
import Input from "@/components/Input"

export default function Login() {
    const router = useRouter()
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = React.useState("")

    const onSignUpClick = () => {
        router.push("/signup")
    }


    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
    }

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!(loginData.username && loginData.password)) return showErrorToast({ message: "Fill all the fields" })

        setFormStatus("loading")

        // Login 
        const { error } = await loginUser(loginData)

        if (error) {
            showErrorToast(error)

            // For user to activate account
            if (error?.response?.data?.message === "User not activated there account") return setFormStatus("activateAccount")

            return setFormStatus("")
        }

        showSuccessToast("Login successful")

        setTimeout(() => {
            router.push("/home")
        }, 1000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>

            <Input disabled={formStatus === "loading"} required type="text" name='username' value={loginData.username} onChange={handleLoginData} placeholder="username or email" />

            <Input disabled={formStatus === "loading"} required type="password" name='password' value={loginData.password} onChange={handleLoginData} placeholder="password" />

            {formStatus === "loading" && <span className="loading loading-dots loading-md" > </span>}

            {/* only show this button when user is not activated */}
            {formStatus === "activateAccount" && <button onClick={() => router.push("/activate-account")} type="button" className="btn btn-primary w-full">Activate Account</button>}

            <button disabled={formStatus === "loading"} className="btn btn-neutral w-full">
                Login
            </button>

            <button type="button" disabled={formStatus === "loading"} onClick={onSignUpClick} className="btn  w-full" > Sign Up </button>
        </form>
    )
}

