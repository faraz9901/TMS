class ApiError extends Error {
    statusCode: number;
    success: boolean;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message || "Something went wrong";
        this.success = false
    }
}

export default ApiError;