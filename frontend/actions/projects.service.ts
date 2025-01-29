import { request } from "@/utils"


const getProjects = async () => {
    try {
        const res = await request.get("/projects")
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

const getProject = async (id: string): Promise<{ data: any, error: any }> => {
    try {
        const res = await request.get(`/projects/${id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const deleteProject = async (id: string): Promise<{ data: any, error: any }> => {
    try {
        const res = await request.delete(`/projects/${id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}



export { getProjects, createProject, deleteProject, getProject }