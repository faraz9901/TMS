"use client"
import React from 'react'
import { toast } from 'react-toastify'


const Input = (props: any) => <input {...props} className="input input-bordered w-full" />

export default function Login() {
    const [showLogin, setShowLogin] = React.useState(false)

    return (
        <dialog id="login" className="modal" >
            <div className="modal-box flex flex-col gap-5 items-center">

                {showLogin ? <LoginForm /> : <SignUpForm />}

                {/* <div className="divider">OR</div> */}

                <button
                    type='button'
                    onClick={() => setShowLogin(!showLogin)}
                    className={"btn w-full " + (showLogin ? "" : "btn-neutral")}
                >
                    {showLogin ? "Sign Up" : "Login"}
                </button>
            </div>
        </dialog >
    )
}


const LoginForm = () => {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    const [formStatus, setFormStatus] = React.useState("")

    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setFormStatus("loading")

        if (!(loginData.username && loginData.password)) return


        setTimeout(() => {
            setFormStatus("")
        }, 2000)

    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>

            <Input disabled={formStatus === "loading"} required type="email" name='username' value={loginData.username} onChange={handleLoginData} placeholder="username or email" />

            <Input disabled={formStatus === "loading"} required type="password" name='password' value={loginData.password} onChange={handleLoginData} placeholder="password" />

            {formStatus === "loading" && <span className="loading loading-dots loading-md"></span>}

            <button disabled={formStatus === "loading"} className="btn btn-neutral w-full">
                Login
            </button>
        </form>
    )
}

const SignUpForm = () => {
    const [signUpData, setSignUpData] = React.useState({
        username: "",
        email: "",
        password: ""
    })
    const [formStatus, setFormStatus] = React.useState("")

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setSignUpData({ ...signUpData, [name]: value })
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setFormStatus("loading")



        setTimeout(() => {
            setFormStatus("")
        }, 2000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Sign Up</h3>

            <Input name="username" required type="text" placeholder="username" onChange={handleFormData} disabled={formStatus === "loading"} />

            <Input required type="email" placeholder="email" name="email" onChange={handleFormData} disabled={formStatus === "loading"} />

            <Input type="password" placeholder="password" required name="password" onChange={handleFormData} disabled={formStatus === "loading"} />

            {formStatus === "loading" && <span className="loading loading-dots loading-md"></span>}

            <button disabled={formStatus === "loading"} className="btn  w-full">Sign Up</button>
        </form>
    )
}