import {Request, Response, NextFunction} from "express";
import {CustomError} from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // if(err instanceof RequestValidationError) {
    //     const formattedErrors = err.errors.map(error => {
    //         return {message: error.msg, field: error.param}
    //     })
    //
    //     return res.status(400).send({errors: formattedErrors})
    // }
    //
    // if(err instanceof DatabaseConnectionError) {
    //     return res.status(500).send({errors: [{message: err.reason}]})
    // }


    if(err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }




    res.status(400).send([{message: err.message || 'Something went wrong'}])
}
