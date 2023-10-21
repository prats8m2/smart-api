import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addSiteValidation from '../middlewares/validations/site/addSite.validation';
import updateSiteValidation from '../middlewares/validations/site/updateSite.validation';
import getSiteValidation from '../middlewares/validations/site/getRole.validation';
import listSitesValidation from '../middlewares/validations/site/listSites.validation';
import deleteSiteValidation from '../middlewares/validations/site/deleteSite.validation';
import RoomController from '../controllers/room/room.controller';
import addRoleValidation from '../middlewares/validations/role/addRole.validation';
import addRoomValidation from '../middlewares/validations/room/addRoom.validation';
import getRoomValidation from '../middlewares/validations/room/getRooom.validation';

const router = Router();

const roomController = new RoomController();
router.post(
	'/add',
	AuthMiddleware,
	addRoomValidation,
	PermissionMiddleware,
	roomController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateSiteValidation,
	PermissionMiddleware,
	roomController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getRoomValidation,
	PermissionMiddleware,
	roomController.get
);

router.get(
	'/list/:accountId/:page/:limit',
	AuthMiddleware,
	listSitesValidation,
	PermissionMiddleware,
	roomController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteSiteValidation,
	PermissionMiddleware,
	roomController.delete
);

export default router;
