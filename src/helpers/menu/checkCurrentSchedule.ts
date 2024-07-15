import moment from 'moment';
import { Schedule } from '../../db/entity/schedule.entity';
import Logger from '../../utility/logger/logger';

// Helper function to check if the current time falls within the schedule
export const checkCurrentSchedule = (schedule: any) => {
	const now = moment().utcOffset('+05:30'); // IST
	const dayOfWeek = now.format('dddd').toLowerCase();

	const startTime: any =
		schedule[`${dayOfWeek}_startTime`] || schedule.startTime;
	const endTime: any = schedule[`${dayOfWeek}_endTime`] || schedule.endTime;

	const currentDate = now.format('DD/MM/YYYY');
	const currentTime = now.format('HH:mm');

    Logger.info(currentDate);
    Logger.info(currentTime);

	const isWithinDateRange = moment(currentDate, 'DD/MM/YYYY').isBetween(
		moment(schedule.startDate, 'DD/MM/YYYY'),
		moment(schedule.endDate, 'DD/MM/YYYY'),
		null,
		'[]'
	);

	const isWithinTimeRange = currentTime >= startTime && currentTime <= endTime;

	return isWithinDateRange && isWithinTimeRange;
};
