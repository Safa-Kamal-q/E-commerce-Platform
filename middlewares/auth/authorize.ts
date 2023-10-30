import express from 'express';
import { NSUser } from '../../@types/userType.js';
import { Role } from '../../db/entities/Role.js';
import ApiError from '../errorHandlers/apiError.js';

const authorize = (api: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.locals.user?.type === 'admin' ) {
      next()
      return
    }
    const permissions: NSUser.Permission[] = res.locals.user?.roles?.flatMap((role: Role) => role.permissions) || [];
    if (permissions.filter(p => p.name === api).length > 0) {
      res.locals.user= res.locals.user
      next();
    } else {
      next(new ApiError("You don't have the permission to access this resource!", 403))
    }
  }
}

export {
  authorize
}