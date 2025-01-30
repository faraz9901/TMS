export interface Project {
    _id: string;
    collection_name: string;
    project_name: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    tasks: string[];
    status: STATUS
}

export enum STATUS {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}