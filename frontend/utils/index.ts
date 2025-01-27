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


const showErrorToast = (error: any) => toast.error(error?.response?.data?.message || error?.message || "Something went wrong")

const showSuccessToast = (message: string) => toast.success(message)

export { request, showErrorToast, showSuccessToast }