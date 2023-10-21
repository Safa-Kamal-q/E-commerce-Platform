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

//need fix 
const errorSender = (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    res.status(error.status).send(error.message);
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