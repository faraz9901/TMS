import { STATUS } from "@/types";
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

const updateTaskStatus = async (project_id: string, task_id: string, status: STATUS) => {
    try {
        await request.patch(`/tasks/${project_id}/${task_id}`, { status })
        return { error: null }
    } catch (error) {
        return { error }
    }
}

const createComment = async (data: { task_id: string, message: string }) => {
    try {
        const res = await request.post(`/tasks/${data.task_id}/comment`, { message: data.message })
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

const getAllComments = async (task_id: string) => {
    try {
        const res = await request.get(`/tasks/${task_id}/comment`)
        return { data: res.data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

export { createTask, getTask, deleteTask, updateTaskStatus, createComment, getAllComments }