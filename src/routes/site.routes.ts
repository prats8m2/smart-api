import { Router } from 'express';
import SiteController from '../controllers/site/site.controller';
import AuthMiddleware from '../middlewares/authorization/auth.middleware';
import PermissionMiddleware from '../middlewares/authorization/permission.middleware';
import addSiteValidation from '../middlewares/validations/site/addSite.validation';
import deleteSiteValidation from '../middlewares/validations/site/deleteSite.validation';
import getSiteValidation from '../middlewares/validations/site/getSite.validation';
import listSitesValidation from '../middlewares/validations/site/listSites.validation';
import updateSiteValidation from '../middlewares/validations/site/updateSite.validation';
import updateSiteSettingsValidation from '../middlewares/validations/site/updateSiteSettings.validation';

const router = Router();

const siteController = new SiteController();
router.post(
	'/add',
	AuthMiddleware,
	addSiteValidation,
	PermissionMiddleware,
	siteController.add
);
router.put(
	'/update',
	AuthMiddleware,
	updateSiteValidation,
	PermissionMiddleware,
	siteController.update
);
router.get(
	'/get/:id',
	AuthMiddleware,
	getSiteValidation,
	PermissionMiddleware,
	siteController.get
);

router.get(
	'/list/:accountId/:page/:limit',
	AuthMiddleware,
	listSitesValidation,
	PermissionMiddleware,
	siteController.list
);

router.delete(
	'/delete/:id',
	AuthMiddleware,
	deleteSiteValidation,
	PermissionMiddleware,
	siteController.delete
);

router.put(
	'/update/settings',
	AuthMiddleware,
	updateSiteSettingsValidation,
	PermissionMiddleware,
	siteController.updateSiteSettings
);

export default router;
