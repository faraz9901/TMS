import React from "react"
import { signUpUser } from "@/actions/user.service"
import { showErrorToast, showSuccessToast } from "@/utils"
import Input from "../Input"



const SignUpForm = ({ onSignUpSucess }: { onSignUpSucess: () => void }) => {
    const [signUpData, setSignUpData] = React.useState({
        username: "",
        email: "",
        password: ""
    })
    const [formStatus, setFormStatus] = React.useState("")

    const cleanUp = () => {
        setFormStatus("")
        setSignUpData({ username: "", email: "", password: "" })
    }


    React.useEffect(() => {
        return () => cleanUp()
    }, [])

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setSignUpData({ ...signUpData, [name]: value })
    }

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus("loading")

        // Validation failed 
        if (!(signUpData.username && signUpData.email && signUpData.password)) {
            showErrorToast({ message: "Fill all the fields" })
            return setFormStatus("")
        }

        // Sign up    
        const { data, error } = await signUpUser(signUpData)

        if (error) {
            setFormStatus("")
            return showErrorToast(error)
        }

        showSuccessToast(data.message)
        setFormStatus("")

        setTimeout(() => {
            cleanUp()
            onSignUpSucess()
        }, 1000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-3 items-center" >
            <h3 className="font-bold text-lg" > Sign Up </h3>

            < Input name="username" required type="text" placeholder="username" onChange={handleFormData} disabled={formStatus === "loading"} />

            <Input required type="email" placeholder="email" name="email" onChange={handleFormData} disabled={formStatus === "loading"} />

            <Input type="password" placeholder="password" required name="password" onChange={handleFormData} disabled={formStatus === "loading"} />

            {formStatus === "loading" && <span className="loading loading-dots loading-md" > </span>}

            <button disabled={formStatus === "loading"} className="btn  w-full" > Sign Up </button>

        </form>
    )
}


export default SignUpForm