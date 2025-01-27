"use client"
import LoginForm from '@/components/Login/LoginForm'
import SignUpForm from '@/components/Login/SignUpForm'
import React from 'react'

export default function Login() {
  const [showLogin, setShowLogin] = React.useState(false)

  const onLoginSuccess = () => {


  }

  const onSignUpSucess = () => {
    setShowLogin(true)
  }

  return (
    <div className=' flex items-center justify-center h-screen bg-gradient-to-b from-slate-800 to-slate-500'>
      <div className="flex flex-col gap-5 items-center w-1/3 shadow-lg p-5 rounded-md bg-slate-100">
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
    </div>
  )
}


