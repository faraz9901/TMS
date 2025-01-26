import React from "react"
import { Input } from "./SignUpForm"

export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = React.useState({
        status: "",
        message: ""
    })

    React.useEffect(() => {
        // clean up
        return () => {
            setFormStatus({ status: "", message: "" })
            setLoginData({ username: "", password: "" })
        }
    }, [])

    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setFormStatus({
            status: "loading",
            message: ""
        })

        if (!(loginData.username && loginData.password)) return

        setTimeout(() => {
            setFormStatus({
                status: "success",
                message: "Login successful"
            })
        }, 2000)

    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>

            <Input disabled={formStatus.status === "loading"} required type="email" name='username' value={loginData.username} onChange={handleLoginData} placeholder="username or email" />

            <Input disabled={formStatus.status === "loading"} required type="password" name='password' value={loginData.password} onChange={handleLoginData} placeholder="password" />

            {formStatus.status === "loading" && <span className="loading loading-dots loading-md"></span>}

            <button disabled={formStatus.status === "loading"} className="btn btn-neutral w-full">
                Login
            </button>
        </form>
    )
}

