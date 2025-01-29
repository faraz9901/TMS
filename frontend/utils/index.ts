import axios from "axios";
import { toast } from "react-toastify";

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    },
    withCredentials: true
})

const getErrorMessage = (error: any) => error?.response?.data?.message || error?.message || "Something went wrong"


const showErrorToast = (error: any) => toast.error(getErrorMessage(error))

const showSuccessToast = (message: string) => toast.success(message)

export { request, showErrorToast, showSuccessToast, getErrorMessage }