import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger';
import CREATE_SCHEDULE from '../../utility/parseSchedule';
import sendResponse from '../../utility/response';

const addCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { name, description, type, sequence, scheduleData } = req.body;
	const { account } = res.locals;
	Logger.info(`Add category request`);

	//create schedule
	let newSchedule: Schedule = new Schedule();
	const schedule = CREATE_SCHEDULE(newSchedule, scheduleData);
	const scheduleResult = await schedule.save();

	//create an account
	let category: Category = new Category();
	category.name = name;
	category.type = type;
	category.description = description;
	category.account = account;
	category.sequence = sequence;
	category.schedule = scheduleResult;

	const result = await category.save();
	sendResponse(res, true, CODE.SUCCESS, `Category added Successful`, result);
};

export default addCategory;
