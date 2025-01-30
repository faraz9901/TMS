import { STATUS } from "@/types";
import { request } from "@/utils"

interface Response {
    data: any;
    error: any
}

const getProjects = async () => {
    try {
        const res = await request.get("/projects")
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const createProject = async (data: { collection_name: string, project_name: string, description: string }): Promise<Response> => {
    try {
        const res = await request.post("/projects", data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const getProject = async (id: string): Promise<Response> => {
    try {
        const res = await request.get(`/projects/${id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const deleteProject = async (id: string): Promise<Response> => {
    try {
        const res = await request.delete(`/projects/${id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const updateProject = async (id: string, data: { collection_name: string, project_name: string, description: string }): Promise<Response> => {
    try {
        const res = await request.put(`/projects/${id}`, data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}


const updateProjectStatus = async (id: string, status: STATUS) => {
    try {
        await request.patch(`/projects/${id}`, { status })
        return { error: null }
    } catch (error) {
        return { error }
    }
}

export { getProjects, createProject, deleteProject, getProject, updateProject, updateProjectStatus }