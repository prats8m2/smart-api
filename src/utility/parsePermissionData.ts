import { Permission } from '../db/entity/permission.entity';

const parsePermissionData = (
	data: Permission[]
): {
	[key: string]: Permission[];
} => {
	const dividedPermissions: { [key: string]: Permission[] } = {};

	data.forEach((permission) => {
		const category = permission.category;

		if (!dividedPermissions[category]) {
			// If the category key doesn't exist, create an array for it
			dividedPermissions[category] = [];
		}

		// Push the permission to the corresponding category
		dividedPermissions[category].push(permission);
	});

	return dividedPermissions;
};

export default parsePermissionData;
