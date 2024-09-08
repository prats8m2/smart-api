import { Router } from 'express';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import SessionController from '../controllers/session/session.controller';
import listSessionValidation from '../middlewares/validations/session/listSession.validation';
import terminateSessionValidation from '../middlewares/validations/session/terminateSession.validation';

const router = Router();

const sessionController = new SessionController();

router.get(
	'/list/:site/:type/:page/:limit',
	AuthMiddleware,
	listSessionValidation,
	PermissionMiddleware,
	sessionController.list
);

router.put(
	'/terminate',
	AuthMiddleware,
	terminateSessionValidation,
	PermissionMiddleware,
	sessionController.terminate
);

export default router;
