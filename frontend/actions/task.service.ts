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


export { createTask }