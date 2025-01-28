import { request } from "@/utils"


const getCollections = async (limit: number | null = null) => {
    try {
        const res = await request.get("/projects/collections", { params: { limit } })
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const createProject = async (data: { collection_name: string, project_name: string, description: string }): Promise<{ data: any, error: any }> => {
    try {
        const res = await request.post("/projects", data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}



export { getCollections, createProject }