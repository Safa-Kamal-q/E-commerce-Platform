import express from "express";
import baseLogger from "../../logger.js";

const errorLogger = (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    baseLogger.error(error.message);
    next(error);
}

const errorSender = (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
        error.statusCode =  error.statusCode || 500
        error.status = error.status || 'error'
    res.status(error.statusCode).json({
        error, 
        message: error.message
    })
}

const error404Handler = (
    req: express.Request,
    res: express.Response,
) => {
    res.status(404).send("You requested something I don't have :(");
}

export {
    errorLogger,
    errorSender,
    error404Handler
}