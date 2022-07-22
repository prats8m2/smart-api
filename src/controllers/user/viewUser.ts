import { Request, Response } from "express";

import sendResponse from "../../utility/response";
import { CODE } from "../../../config/config";

const viewUser = async (req: Request, res: Response) => {
  try {
    //get params
    const { id } = req.params;
    sendResponse(res, true, CODE.SUCCESS, "User data", id);
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

export default viewUser;
