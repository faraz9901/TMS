export interface Project {
    _id: string;
    collection_name: string;
    project_name: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    tasks?: Task[];
    status: STATUS
}


export interface Task {
    _id: string
    task_name: string
    project: Project | string
    status: STATUS
    description: string
}

export enum STATUS {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}