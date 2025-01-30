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
    task_name: string
}

export enum STATUS {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}