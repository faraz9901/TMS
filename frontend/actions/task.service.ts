import { request } from "@/utils";

interface CreateTask {
    task_name: string;
    description: string;
    project: string;
}

const createTask = async (data: CreateTask) => {
    try {
        const res = await request.post("/tasks", data)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}


const getTask = async (project_id: string, task_id: string) => {
    try {
        const res = await request.get(`/tasks/${project_id}/${task_id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const deleteTask = async (task_id: string, project_id: string) => {
    try {
        const res = await request.delete(`/tasks/${project_id}/${task_id}`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export { createTask, getTask, deleteTask }