import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { COUNTRIES } from '../../constants/countries.constant';

const getStates = async (req: Request, res: Response) => {
	const { cCode } = req.params;
	Logger.info(`Getting state list`);

	//getting state list
	const states = COUNTRIES.find((country) => country.code2 === cCode);

	sendResponse(res, true, CODE.SUCCESS, `State list data`, states);
};

export default getStates;
