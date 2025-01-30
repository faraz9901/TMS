import { z } from "zod";
import { STATUS } from "../types";

const createTaskDto = z.object({
    task_name: z.string({ required_error: "Task name is required" }).regex(/^[a-zA-Z0-9_ ]+$/, { message: "Task name can only contain alphabets, numbers, underscore and space" }),
    description: z.string({ required_error: "Description is required" }),
    status: z.enum([STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE], { required_error: "Status is required", message: "Invalid status" }),
    project: z.string({ required_error: "Project is required" }),
})

export { createTaskDto }