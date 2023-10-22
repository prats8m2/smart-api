import { Schedule } from '../db/entity/schedule.entity';

const CREATE_SCHEDULE = (schedule: Schedule, scheduleData: any) => {
	schedule.startDate = scheduleData.startDate;
	schedule.endDate = scheduleData.endDate;
	schedule.sunday_startTime = scheduleData.sunday_startTime;
	schedule.sunday_endTime = scheduleData.sunday_endTime;
	schedule.monday_startTime = scheduleData.monday_startTime;
	schedule.monday_endTime = scheduleData.monday_endTime;
	schedule.tuesday_startTime = scheduleData.tuesday_startTime;
	schedule.tuesday_endTime = scheduleData.tuesday_endTime;
	schedule.wednesday_startTime = scheduleData.wednesday_startTime;
	schedule.wednesday_endTime = scheduleData.wednesday_endTime;
	schedule.thursday_startTime = scheduleData.thursday_startTime;
	schedule.thursday_endTime = scheduleData.thursday_endTime;
	schedule.friday_startTime = scheduleData.friday_startTime;
	schedule.friday_endTime = scheduleData.friday_endTime;
	schedule.saturday_startTime = scheduleData.saturday_startTime;
	schedule.saturday_endTime = scheduleData.saturday_endTime;

	return schedule;
};

export default CREATE_SCHEDULE;
