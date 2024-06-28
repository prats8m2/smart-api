import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const addEvent = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		name,
		description,
		inHouse,
		location,
		googleLocation,
		enntryFee,
		site,
		startDate,
		endData,
		startTime,
		endTime,
	} = req.body;
	const { loggedInId } = res.locals;
	Logger.info(`Add Event request`);

	//create schedule
	let newSchedule: Schedule = new Schedule();
	newSchedule.startDate = startDate;
	newSchedule.endDate = endData;
	newSchedule.startTime = startTime;
	newSchedule.endTime = endTime;
	const scheduleResult = await newSchedule.save();

	//create an event
	let eventObj: Events = new Events();
	eventObj.name = name;
	eventObj.description = description;
	eventObj.enntryFee = enntryFee;
	eventObj.inHouse = inHouse;
	eventObj.location = location;
	eventObj.googleLocation = googleLocation;
	eventObj.schedule = scheduleResult;
	eventObj.site = site;
	eventObj.createdBy = loggedInId;

	const eventResult = await eventObj.save();

	sendResponse(res, true, CODE.SUCCESS, `Event added Successful`, eventResult);
};

export default addEvent;
