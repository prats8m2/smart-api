import { Router } from 'express';
import TableController from '../controllers/table/table.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addTableValidation from '../middlewares/validations/table/addTable.validation';
import deleteTableValidation from '../middlewares/validations/table/deleteTable.validation';
import getTableValidation from '../middlewares/validations/table/getTable.validation';
import listTablesValidation from '../middlewares/validations/table/listTables.validation';
import updateTableValidation from '../middlewares/validations/table/updateTable.validation';

const router = Router();

const tableController = new TableController();
router.post(
	'/add',
	AuthMiddleware,
	addTableValidation,
	PermissionMiddleware,
	tableController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateTableValidation,
	PermissionMiddleware,
	tableController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getTableValidation,
	PermissionMiddleware,
	tableController.get
);

router.get(
	'/list/:siteId/:page/:limit',
	AuthMiddleware,
	listTablesValidation,
	PermissionMiddleware,
	tableController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteTableValidation,
	PermissionMiddleware,
	tableController.delete
);

export default router;
