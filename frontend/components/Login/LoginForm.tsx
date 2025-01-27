import React from "react"
import { Input } from "./SignUpForm"
import { loginUser } from "@/actions/user.service"
import { showErrorToast, showSuccessToast } from "@/utils"


export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = React.useState("")

    const cleanUp = () => {
        setFormStatus("")
        setLoginData({ username: "", password: "" })
    }

    React.useEffect(() => {
        return () => cleanUp()
    }, [])

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
            onLoginSuccess()
        }, 1000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>

            <Input disabled={formStatus === "loading"} required type="text" name='username' value={loginData.username} onChange={handleLoginData} placeholder="username or email" />

            <Input disabled={formStatus === "loading"} required type="password" name='password' value={loginData.password} onChange={handleLoginData} placeholder="password" />

            {formStatus === "loading" && <span className="loading loading-dots loading-md" > </span>}

            {formStatus === "activateAccount" && <button onClick={() => cleanUp()} type="button" className="btn btn-primary w-full">Activate Account</button>}

            <button disabled={formStatus === "loading"} className="btn btn-neutral w-full">
                Login
            </button>
        </form>
    )
}

