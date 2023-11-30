import { In } from 'typeorm';
import { ROLES } from '../../../config/config';
import MANAGER_PERMISSION from '../../constants/permissions/manager';
import { Account } from '../../db/entity/account.entity';
import { Permission } from '../../db/entity/permission.entity';
import { Role } from '../../db/entity/role.entity';
import STAFF_PERMISSION from '../../constants/permissions/staff';
import USER_PERMISSION from '../../constants/permissions/user';

const addDefaultRoles = async (account: Account) => {
	//Fetch user sepcific permission to create role
	const userPermissions: Permission[] = await Permission.find({
		name: In(USER_PERMISSION),
	});

	//create a new role
	const role = new Role();
	role.name = ROLES.OWNER;
	role.type = 2;
	role.account = account;
	role.permissions = userPermissions;
	const newRole = await role.save();

	//Fetch manager sepcific permission to create manager role
	const managerPermission: Permission[] = await Permission.find({
		name: In(MANAGER_PERMISSION),
	});

	//create a new manager role
	const managerRole = new Role();
	managerRole.name = ROLES.MANAGER;
	managerRole.type = 3;
	managerRole.account = account;
	managerRole.permissions = managerPermission;
	const newManagerRole = await managerRole.save();

	//Fetch staff sepcific permission to create role
	const staffPermission: Permission[] = await Permission.find({
		name: In(STAFF_PERMISSION),
	});

	//Create a new staff role
	const staffRole = new Role();
	staffRole.name = ROLES.ATTENDANT;
	staffRole.type = 4;
	staffRole.account = account;
	staffRole.permissions = staffPermission;
	const newStaffRole = await staffRole.save();

	return { newRole, newManagerRole, newStaffRole };
};

export default addDefaultRoles;
