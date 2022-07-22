import { Request, Response } from "express";
import MD5 from 'MD5';

import sendResponse from "../../utility/response";
import { CODE } from "../../../config/config";
import {
  INSERT_USER,
  SELECT_USER_BY_EMAIL,
  INSERT_SITE,
} from "../../constants/queries";
import { query } from "../../db/index";
import { INSERT_MENU_ITEMS } from "../../constants/queries";
import { createToken } from "../../utility/jwt";
import {
  OWNER,
  DEFAULT_MENU_NAME,
  DEFAULT_CATEGORY_NAME,
  DEFAULT_PRODUCT_NAME,
  DEFAULT_PRODUCT_DESC,
  DEFAULT_PRODUCT_PRICE,
} from "../../constants/index";
import {
  INSERT_MENU,
  INSERT_CATEGORY,
  INSERT_PRODUCT,
} from "../../constants/queries";

const signup = async (req: Request, res: Response) => {
  try {
    //get data
    const { fullName, email, password, siteName, siteType } = req.body;

    //check if email already exist or not
    const isUserExist = await query(SELECT_USER_BY_EMAIL, [email]);
    if (isUserExist.rows.length) {
      sendResponse(res, false, 301, "Email already exist", email);
      return;
    }

    //Add entry for User
    const newUserResponse: any = await query(INSERT_USER, [
      fullName,
      email,
      MD5(password),
      OWNER,
    ]);
    const newUserData = newUserResponse.rows[0];
    const userId = newUserData.id;

    //create token
    const tokenData = {
      id: userId,
      role: OWNER,
      fullName,
      email,
    };

    const token = createToken(tokenData);
    sendResponse(res, true, CODE.SUCCESS, "User added", { id: userId, token });

    //Add Site
    const newSiteResponse: any = await query(INSERT_SITE, [
      siteName,
      siteType,
      null,
      userId,
    ]);
    const newSiteData = newSiteResponse.rows[0];
    const siteId = newSiteData.id;

    //Add Menu
    const newMenuResponse: any = await query(INSERT_MENU, [
      DEFAULT_MENU_NAME,
      {},
      siteId,
    ]);
    const newMenuData = newMenuResponse.rows[0];
    const menuId = newMenuData.id;

    //Add Category
    const newCategoryResponse: any = await query(INSERT_CATEGORY, [
      DEFAULT_CATEGORY_NAME,
      {},
      userId,
    ]);
    const newCategoryData = newCategoryResponse.rows[0];
    const categoryId = newCategoryData.id;

    //Add Product
    const newProductResponse: any = await query(INSERT_PRODUCT, [
      DEFAULT_PRODUCT_NAME,
      DEFAULT_PRODUCT_DESC,
      DEFAULT_PRODUCT_PRICE,
      categoryId,
      userId,
    ]);
    const newProductData = newProductResponse.rows[0];
    const productId = newProductData.id;

    //Add mapping of Menu Items
    await query(INSERT_MENU_ITEMS, [menuId, categoryId, productId]);
  } catch (_e) {
    console.log("~ _e", _e);
    sendResponse(
      res,
      false,
      CODE.SERVER_ERROR,
      "Some error occurred",
      _e.message
    );
  }
};

export default signup;
