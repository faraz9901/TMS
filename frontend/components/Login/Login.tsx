"use client"
import React from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

export default function Login() {
    const [showLogin, setShowLogin] = React.useState(false)

    const onLoginSuccess = () => {
        setShowLogin(false)
    }

    const onSignUpSucess = () => {
        setShowLogin(true)
    }

    return (
        <dialog id="login" className="modal" >
            <div className="modal-box flex flex-col gap-5 items-center">

                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {showLogin ? <LoginForm onLoginSuccess={onLoginSuccess} /> : <SignUpForm onSignUpSucess={onSignUpSucess} />}

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


