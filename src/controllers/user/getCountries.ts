import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { COUNTRIES } from '../../constants/countries.constant';

const getCountries = async (req: Request, res: Response) => {
	Logger.info(`Getting countries list`);

	//getting countries list
	const countries = COUNTRIES.map((country) => ({
		code: country.code2,
		name: country.name,
	}));

	sendResponse(res, true, CODE.SUCCESS, `Countries data`, countries);
};

export default getCountries;
