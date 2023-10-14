import { User } from '../../db/entity/user.entity';
import { Role } from '../../db/entity/role.entity';
import { Permission } from '../../db/entity/permission.entity';
import Logger from '../../utility/logger';
import ALL_PERMISSION from '../../constants/permissions';
import SUPER_ADMIN_PERMISSIONS from '../../constants/permissions/superAdmin';

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
		const permissionItem = allPermissions[index];
		const permission: Permission = new Permission();
		permission.name = permissionItem;
		await permission.save();
	}

	const superAdminPermission: Permission[] = await Permission.find({
		name: SUPER_ADMIN_PERMISSIONS[0],
	});

	//Add Role
	const role: Role = new Role();
	role.name = 'SUPER-ADMIN';
	role.type = 1;
	role.permissions = superAdminPermission;
	const newRole = await role.save();

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
