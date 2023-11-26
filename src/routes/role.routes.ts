import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import RoleController from '../controllers/role/role.controller';
import addRoleValidation from '../middlewares/validations/role/addRole.validation';
import listPermissionsValidation from '../middlewares/validations/role/listPermissions.validation';
import updateRoleValidation from '../middlewares/validations/role/updateRole.validation';
import listRolesValidation from '../middlewares/validations/role/listRoles.validation';
import getRoleValidation from '../middlewares/validations/site/getSite.validation';
import deleteRoleValidation from '../middlewares/validations/role/deleteRole.validation';

const router = Router();

const roleController = new RoleController();
router.post(
	'/add',
	AuthMiddleware,
	addRoleValidation,
	PermissionMiddleware,
	roleController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateRoleValidation,
	PermissionMiddleware,
	roleController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getRoleValidation,
	PermissionMiddleware,
	roleController.get
);

router.get(
	'/list/:accountId/:page/:limit',
	AuthMiddleware,
	listRolesValidation,
	PermissionMiddleware,
	roleController.list
);

router.get(
	'/permissions/list/:accountId/:page/:limit',
	AuthMiddleware,
	listPermissionsValidation,
	PermissionMiddleware,
	roleController.listPermission
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteRoleValidation,
	PermissionMiddleware,
	roleController.delete
);

export default router;
