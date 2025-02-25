export class ErrorHandler extends Error {
    statusCode: any
    constructor(message: any, statusCode: any) {
        super(message)
        this.statusCode = statusCode
    }
}