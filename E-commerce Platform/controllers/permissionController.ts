import { NSUser } from "../@types/userType.js";
import { Permission } from "../db/entities/Permission.js";

const insertPermission = async (payload: NSUser.Permission) => {
    try {
        const permission = new Permission()
        permission.name = payload.name;

        await permission.save()
        return permission
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const getPermission = () => {
    return Permission.find();
}

const getPermissionByID = async (id: number) => {
    return await Permission.findBy({ id });
}

export {
    insertPermission,
    getPermission,
    getPermissionByID
}