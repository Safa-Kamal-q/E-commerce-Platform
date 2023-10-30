class ApiError extends Error {
    public statusCode: number;
    public status: string;

    constructor(message: string, statusCode: number) {
        if(message === ''){
            message = 'Something went wrong'
        }
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    }
}

export default ApiError;
