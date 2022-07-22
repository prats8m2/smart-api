import { Request, Response } from "express";
import MD5 from "MD5";

import { CODE } from "../../../config/config";
import { query } from "../../db/index";
import { createToken } from "../../utility/jwt";
import { SELECT_USER_BY_EMAIL_PASS } from "../../constants/queries";
import sendResponse from "../../utility/response";

const login = async (req: Request, res: Response) => {
  try {
    //get data
    const { email, password } = req.body;

    //check if email already exist or not
    const userData = await query(SELECT_USER_BY_EMAIL_PASS, [
      email,
      MD5(password),
    ]);
    if (!userData.rows.length) {
      sendResponse(res, false, 302, "Invalid credentials");
      return;
    }

    const user: any = userData.rows[0];
    //create token
    const tokenData = {
      id: user.id,
      role: user.role,
      fullName: user.fullName,
      email,
    };

    const token = createToken(tokenData);
    sendResponse(res, true, CODE.SUCCESS, "Login Successful", {
      id: user.id,
      token,
    });
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

export default login;
