import { Request, Response } from 'express';
import { CODE } from '../../../config/config';
import { Feedback } from '../../db/entity/feedback.entity';
import Logger from '../../utility/logger/logger';
import sendResponse from '../../utility/response';

const addFeedback = async (req: Request, res: Response) => {
	//fetch data from body
	const {
		name,
		email,
		mobile,
		review,
		cleanlinessRating,
		serviceQualityRating,
		site,
		facilitiesRating,
		foodRating,
		overallRating,
	} = req.body;
	Logger.info(`Add Feedback request`);

	//create an feedback
	let feedback: Feedback = new Feedback();
	feedback.name = name;
	feedback.email = email;
	feedback.mobile = mobile;
	feedback.review = review;
	feedback.cleanlinessRating = cleanlinessRating;
	feedback.serviceQualityRating = serviceQualityRating;
	feedback.facilitiesRating = facilitiesRating;
	feedback.foodRating = foodRating;
	feedback.overallRating = overallRating;
	feedback.site = site;

	const feedbackResult = await feedback.save();

	sendResponse(
		res,
		true,
		CODE.SUCCESS,
		`Feedback added Successful`,
		feedbackResult
	);
};

export default addFeedback;
