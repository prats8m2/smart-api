import { Router } from 'express';
import DeviceController from '../controllers/device/device.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addDeviceValidation from '../middlewares/validations/device/addDevice.validation';
import deleteDeviceValidation from '../middlewares/validations/device/deleteDevice.validation';
import getDeviceValidation from '../middlewares/validations/device/getDevice.validation';
import listDevicesValidation from '../middlewares/validations/device/listRooms.validation';
import updateDeviceValidation from '../middlewares/validations/device/updateDevice.validation';

const router = Router();

const deviceController = new DeviceController();
router.post(
	'/add',
	AuthMiddleware,
	addDeviceValidation,
	PermissionMiddleware,
	deviceController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateDeviceValidation,
	PermissionMiddleware,
	deviceController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getDeviceValidation,
	PermissionMiddleware,
	deviceController.get
);

router.get(
	'/list/:siteId/:page/:limit',
	AuthMiddleware,
	listDevicesValidation,
	PermissionMiddleware,
	deviceController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteDeviceValidation,
	PermissionMiddleware,
	deviceController.delete
);

router.get(
	'/list/available/:siteId',
	AuthMiddleware,
	listDevicesValidation,
	PermissionMiddleware,
	deviceController.listAvailableDevices
);

router.get(
	'/generate/token/:id',
	deviceController.createDeviceToken
);

export default router;
