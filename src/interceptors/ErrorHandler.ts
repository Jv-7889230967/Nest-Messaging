import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorHandler implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';

                console.log("error occurred",exception);
        response.status(status).json({
            success:false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            error:
                typeof message === 'string'
                    ? message
                    : (message as any).message || 'Unknown error',
        });
    }
}
