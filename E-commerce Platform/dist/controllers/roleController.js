import { In } from "typeorm";
import { Permission } from "../db/entities/Permission.js";
import { Role } from "../db/entities/Role.js";
const insertRole = async (payload) => {
    try {
        const role = new Role();
        role.name = payload.name;
        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        });
        await role.save();
        return role;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
};
const getRoles = () => {
    return Role.find();
};
const getRolesByID = async (id) => {
    return await Role.findBy({ id });
};
export { insertRole, getRoles, getRolesByID };
//# sourceMappingURL=roleController.js.map