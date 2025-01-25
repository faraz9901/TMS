class ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    content?: any;

    constructor(statusCode: number, message: string, content?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.content = content;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}

export default ApiResponse;