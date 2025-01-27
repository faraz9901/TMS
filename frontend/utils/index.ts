import axios from "axios";

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    },
    withCredentials: true
})


export { request }