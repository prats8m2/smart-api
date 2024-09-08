import { Router } from 'express';
import FeedbackController from '../controllers/feedback/feedback.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addFeedbackValidation from '../middlewares/validations/feedback/addFeedback.validation';
import listFeedbackValidation from '../middlewares/validations/feedback/listFeedback.validation';
import deleteFeedbackValidation from '../middlewares/validations/feedback/deleteFeedback.validation';

const router = Router();

const feedbackController = new FeedbackController();
router.post(
	'/add',
	AuthMiddleware,
	addFeedbackValidation,
	// PermissionMiddleware,
	feedbackController.add
);

// router.put(
// 	'/update',
// 	AuthMiddleware,
// 	updateEventValidation,
// 	PermissionMiddleware,
// 	eventController.update
// );

// router.get(
// 	'/get/:id',
// 	AuthMiddleware,
// 	getEventValidation,
// 	PermissionMiddleware,
// 	eventController.get
// );

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteFeedbackValidation,
	PermissionMiddleware,
	feedbackController.delete
);

router.get(
	'/list/:siteId/:page/:limit',
	AuthMiddleware,
	listFeedbackValidation,
	PermissionMiddleware,
	feedbackController.list
);

export default router;
