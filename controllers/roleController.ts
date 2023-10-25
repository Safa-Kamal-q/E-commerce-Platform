import { In } from "typeorm";
import { NSUser } from "../@types/userType.js";
import { Permission } from "../db/entities/Permission.js";
import { Role } from "../db/entities/Role.js";

const insertRole = async (payload: NSUser.Role) => {
    try {
        const role = new Role()

        role.name = payload.name;

        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        })

        await role.save()

        return role
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const getRoles = () => {
    return Role.find();
}

const getRolesByID = async (id: string) => {
    return await Role.findBy({ id });
}

const deleteRole = async (role: Role) => {
    try {
        await role.remove();
        return ("Role deleted successfully ")
    } catch (error) {
        console.log(error)
        throw ("Something went wrong")
    }
}

const updateRole = async (role: Role, payload: NSUser.Role) => {
    try {
        Role.merge(role, payload);
        await Role.save(role);
        return ("Role updated successfully")
    } catch (error) {
        console.log(error)
        return ("Something went wrong")
    }
}

export {
    insertRole,
    getRoles,
    getRolesByID,
    deleteRole,
    updateRole
}