import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Category } from '../../db/entity/category.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger/logger';
import CREATE_SCHEDULE from '../../utility/parseSchedule';
import sendResponse from '../../utility/response';

const updateCategory = async (req: Request, res: Response) => {
	//fetch data from body
	const { id, name, description, type, sequence, scheduleData } = req.body;
	Logger.info(`Update category request`);

	const category: Category = await Category.findOne(id);

	//create schedule
	let schedule: Schedule = await Schedule.findOne(category?.schedule?.id);
	const newSchedule = CREATE_SCHEDULE(schedule, scheduleData);
	await newSchedule.save();

	//create an account
	category.name = name;
	category.type = type;
	category.description = description;
	category.sequence = sequence;

	const result = await category.save();
	sendResponse(res, true, CODE.SUCCESS, `Category updated Successful`, result);
};

export default updateCategory;
