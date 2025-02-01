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


function timePassed(pastTime: Date) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - pastTime.getTime(); // Difference in milliseconds

    if (timeDifference < 0) {
        return null
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return "Just now";
    }
}

export { request, showErrorToast, showSuccessToast, getErrorMessage, timePassed }