import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import Logger from '../../utility/logger/logger';
import { CODE } from '../../../config/config';
import { CURRENCIES } from '../../constants/currencies';

const getCurrencies = async (req: Request, res: Response) => {
	Logger.info(`Getting currencies list`);
	sendResponse(res, true, CODE.SUCCESS, `Currencies data`, CURRENCIES);
};

export default getCurrencies;
