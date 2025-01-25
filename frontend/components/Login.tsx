"use client"
import React, { FormEvent } from 'react'

export default function Login() {
    const [showLogin, setShowLogin] = React.useState(false)

    return (
        <dialog id="login" className="modal" >
            <div className="modal-box flex flex-col gap-3 items-center">

                {showLogin ? <LoginForm /> : <SignUpForm />}

                <div className="divider">OR</div>

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
    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onFormSubmit} className="flex  w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Login</h3>
            <input required type="text" placeholder="username or email" className="input input-bordered w-full " />
            <input type="password" placeholder="password" className="input input-bordered w-full " required />
            <button className="btn btn-neutral w-full">Login</button>
        </form>
    )
}

const SignUpForm = () => {

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-3 items-center">
            <h3 className="font-bold text-lg">Sign Up</h3>
            <input required type="text" placeholder="username " className="input input-bordered w-full " />
            <input required type="email" placeholder="email" className="input input-bordered w-full " />
            <input type="password" placeholder="password" className="input input-bordered w-full " required />
            <button className="btn  w-full">Sign Up</button>
        </form>
    )
}