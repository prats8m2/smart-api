import { Router } from "express";
import EventController from "../controllers/event/event.controller";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addEventValidation from "../middlewares/validations/event/addEvent.validation";
import updateEventValidation from "../middlewares/validations/event/updateEvent.validation";
import getEventValidation from "../middlewares/validations/event/getEvent.validation";
import deleteEventValidation from "../middlewares/validations/event/deleteEvent.validation";
import listeventValidation from "../middlewares/validations/event/listEvent.validation";

const router = Router();

const eventController = new EventController();
router.post(
	'/add',
	AuthMiddleware,
	addEventValidation,
	PermissionMiddleware,
	eventController.add
);

router.put(
	'/update',
	AuthMiddleware,
	updateEventValidation,
	PermissionMiddleware,
	eventController.update
);


router.get(
	'/get/:id',
	AuthMiddleware,
	getEventValidation,
	PermissionMiddleware,
	eventController.get
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteEventValidation,
	PermissionMiddleware,
	eventController.delete
);


router.get(
	'/list/:siteId/:page/:limit',
	AuthMiddleware,
	listeventValidation,
	PermissionMiddleware,
	eventController.list
);

export default router;
