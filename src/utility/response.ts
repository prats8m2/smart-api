import { Response } from "express";

export default function sendResponse(
  res: Response,
  status: boolean,
  code: number,
  message: string,
  data?: any
) {
  res.status(code).send({
		status,
		message,
		data,
	});
}
