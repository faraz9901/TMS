import { z } from "zod";
import { STATUS } from "../types";

const createProjectDto = z.object({
    collection_name: z.string({ required_error: "Collection name is required" }).regex(/^[a-zA-Z0-9_ ]+$/, { message: "Collection name can only contain alphabets, numbers and underscore" }),
    project_name: z.string({ required_error: "Project name is required" }).regex(/^[a-zA-Z0-9_ ]+$/, { message: "Project name can only contain alphabets, numbers, underscore and space" }),
    description: z.string({ required_error: "Description is required" }),
})

const statusDto = z.nativeEnum(STATUS, { required_error: "Status is required", message: "Invalid status" })

export { createProjectDto, statusDto }
