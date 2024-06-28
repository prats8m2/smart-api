import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Events } from '../../db/entity/event.entity';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const updateEvent = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		id,
		name,
		description,
		inHouse,
		location,
		googleLocation,
		enntryFee,
		startDate,
		endData,
		startTime,
		endTime,
	} = req.body;
	const { loggedInId } = res.locals;
	Logger.info(`event Update request`);

	const eventDetails: Events = await Events.findOne(id, {relations:['schedule']});
	//create schedule
	let schedule: Schedule = await Schedule.findOne(eventDetails?.schedule?.id);
	schedule.startDate = startDate;
	schedule.endDate = endData;
	schedule.startTime = startTime;
	schedule.endTime = endTime;
	const scheduleResult = await schedule.save();

	//update an event
	eventDetails.name = name;
	eventDetails.description = description;
	eventDetails.enntryFee = enntryFee;
	eventDetails.inHouse = inHouse;
	eventDetails.location = location;
	eventDetails.googleLocation = googleLocation;
	eventDetails.schedule = scheduleResult;
	eventDetails.updatedBy = loggedInId;

	const eventResult = await eventDetails.save();

	sendResponse(res, true, CODE.SUCCESS, `Event updated Successful`, eventResult);
};

export default updateEvent;
