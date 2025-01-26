import { request } from "@/utils"

const signUpUser = async (data: { username: string, email: string, password: string }): Promise<{ data: any, error: any }> => {
    try {
        const res = await request.post("/user/signup", data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const loginUser = async (data: { username: string, password: string }): Promise<{ data: any, error: any }> => {
    try {
        const res = await request.post("/user/login", data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}



export { signUpUser, loginUser }