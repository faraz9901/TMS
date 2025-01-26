import React from "react"
import { signUpUser } from "@/actions/user.service"

export const Input = (props: any) => <input {...props} className="input input-bordered w-full" />

const SignUpForm = ({ onSignUpSucess }: { onSignUpSucess: () => void }) => {
    const [signUpData, setSignUpData] = React.useState({
        username: "",
        email: "",
        password: ""
    })

    const cleanUp = () => {
        setFormStatus({ status: "", message: "" })
        setSignUpData({ username: "", email: "", password: "" })
    }

    const [formStatus, setFormStatus] = React.useState({
        status: "",
        message: ""
    })

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
        setFormStatus({ status: "loading", message: "" })

        // Validation failed 
        if (!(signUpData.username && signUpData.email && signUpData.password)) return setFormStatus({ status: "error", message: "Fill all the fields" })

        // Sign up    
        const { data, error } = await signUpUser(signUpData)

        if (error) return setFormStatus({ status: "error", message: error?.response?.data?.message || error.message || "Error signing up" })

        setFormStatus({ status: "success", message: data.message })

        setTimeout(() => {
            cleanUp()
            onSignUpSucess()
        }, 1000)
    }

    return (
        <form onSubmit={onFormSubmit} className="flex w-full flex-col gap-3 items-center" >
            <h3 className="font-bold text-lg" > Sign Up </h3>

            < Input name="username" required type="text" placeholder="username" onChange={handleFormData} disabled={formStatus.status === "loading"} />

            <Input required type="email" placeholder="email" name="email" onChange={handleFormData} disabled={formStatus.status === "loading"} />

            <Input type="password" placeholder="password" required name="password" onChange={handleFormData} disabled={formStatus.status === "loading"} />


            {/* Form Status messages */}
            {formStatus.status === "error" && <p className="text-red-500" > {formStatus.message} </p>}

            {formStatus.status === "loading" && <span className="loading loading-dots loading-md" > </span>}

            {formStatus.status === "success" && <p className="text-green-800" > {formStatus.message} </p>}

            <button disabled={formStatus.status === "loading"} className="btn  w-full" > Sign Up </button>

        </form>
    )
}


export default SignUpForm