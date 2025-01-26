import React from "react"
import { Input } from "./SignUpForm"
import { loginUser } from "@/actions/user.service"

export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = React.useState({
        status: "",
        message: ""
    })

    const cleanUp = () => {
        setFormStatus({ status: "", message: "" })
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

        setFormStatus({
            status: "loading",
            message: ""
        })

        if (!(loginData.username && loginData.password)) return setFormStatus({ status: "error", message: "Fill all the fields" })

        // Login 
        const { data, error } = await loginUser(loginData)

        if (error) return setFormStatus({ status: "error", message: error.response?.data?.message || error.message || "Error signing up" })

        setFormStatus({ status: "success", message: data.message })

        setTimeout(() => {
            cleanUp()
            onLoginSuccess()
        }, 1000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>

            <Input disabled={formStatus.status === "loading"} required type="text" name='username' value={loginData.username} onChange={handleLoginData} placeholder="username or email" />

            <Input disabled={formStatus.status === "loading"} required type="password" name='password' value={loginData.password} onChange={handleLoginData} placeholder="password" />

            {/* Form Status messages */}
            {formStatus.status === "error" && <p className="text-red-500" > {formStatus.message} </p>}

            {formStatus.status === "loading" && <span className="loading loading-dots loading-md" > </span>}

            {formStatus.status === "success" && <p className="text-green-800" > {formStatus.message} </p>}

            <button disabled={formStatus.status === "loading"} className="btn btn-neutral w-full">
                Login
            </button>
        </form>
    )
}

