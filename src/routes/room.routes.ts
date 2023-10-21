import { Router } from 'express';
import RoomController from '../controllers/room/room.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addRoomValidation from '../middlewares/validations/room/addRoom.validation';
import deleteRoomValidation from '../middlewares/validations/room/deleteRoom.validation';
import getRoomValidation from '../middlewares/validations/room/getRoom.validation';
import listRoomsValidation from '../middlewares/validations/room/listRooms.validation';
import updateRoomValidation from '../middlewares/validations/room/updateRoom.validation';

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
	updateRoomValidation,
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
	'/list/:siteId/:page/:limit',
	AuthMiddleware,
	listRoomsValidation,
	PermissionMiddleware,
	roomController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteRoomValidation,
	PermissionMiddleware,
	roomController.delete
);

export default router;
