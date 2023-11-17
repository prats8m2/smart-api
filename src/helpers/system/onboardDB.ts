import { User } from '../../db/entity/user.entity';
import { Role } from '../../db/entity/role.entity';
import { Permission } from '../../db/entity/permission.entity';
import Logger from '../../utility/logger/logger';
import ALL_PERMISSION from '../../constants/permissions/default';
import SUPER_ADMIN_PERMISSIONS from '../../constants/permissions/superAdmin';
import USER_PERMISSION from '../../constants/permissions/user';
import { In } from 'typeorm';
import { ROLES } from '../../../config/config';

//Create a Super Admin for app
const onboardDB = async (
	username: string,
	password: string,
	email: string,
	firstName: string,
	lastName: string
) => {
	//Add permission
	const allPermissions = ALL_PERMISSION;
	for (let index = 0; index < allPermissions.length; index++) {
		const permissionObj = allPermissions[index];
		const category = permissionObj.category;
		for (let index = 0; index < permissionObj.permissions.length; index++) {
			const permissionItem = permissionObj.permissions[index];
			const permission: Permission = new Permission();
			permission.name = permissionItem;
			permission.category = category;
			await permission.save();
		}
	}

	const superAdminPermission: Permission[] = await Permission.find({
		name: In(SUPER_ADMIN_PERMISSIONS),
	});

	//Add Role
	const SARole: Role = new Role();
	SARole.name = ROLES.SUPER_ADMIN;
	SARole.type = 1;
	SARole.permissions = superAdminPermission;
	const newRole = await SARole.save();

	//Create an User
	const user: User = new User();
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.username = username;
	user.password = password;
	user.role = newRole;
	const result = await user.save();
	Logger.info('Super Admin created successfully');
};

export default onboardDB;
