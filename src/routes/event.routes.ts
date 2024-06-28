import { Router } from "express";
import EventController from "../controllers/event/event.controller";
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addEventValidation from "../middlewares/validations/event/addEvent.validation";

const router = Router();

const eventController = new EventController();
router.post(
	'/add',
	AuthMiddleware,
	addEventValidation,
	PermissionMiddleware,
	eventController.add
);

export default router;
