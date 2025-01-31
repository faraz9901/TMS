import { z } from "zod";

const createTaskDto = z.object({
    task_name: z.string({ required_error: "Task name is required" }).regex(/^[a-zA-Z0-9_ ]+$/, { message: "Task name can only contain alphabets, numbers, underscore and space" }),
    description: z.string({ required_error: "Description is required" }),
    project: z.string({ required_error: "Project is required" }),
})


const commentDto = z.object({
    message: z.string({ required_error: "Comment is required" }),
})

export { createTaskDto, commentDto }