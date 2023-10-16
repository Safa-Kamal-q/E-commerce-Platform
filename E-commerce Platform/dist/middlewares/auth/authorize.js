const authorize = (api) => {
    return (req, res, next) => {
        if (res.locals.user?.type === 'admin') {
            next();
            return;
        }
        const permissions = res.locals.user?.roles?.flatMap((role) => role.permissions) || [];
        if (permissions.filter(p => p.name === api).length > 0) {
            res.locals.user = res.locals.user;
            next();
        }
        else {
            res.status(403).send("You don't have the permission to access this resource!");
        }
    };
};
export { authorize };
//# sourceMappingURL=authorize.js.map