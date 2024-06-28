import { Request, Response } from 'express';
import addFeedback from './addFeedback';
import listFeedbacks from './listFeedbacks';
import deleteFeedback from './deleteFeedback';
class FeedbackController {
	public add = async (req: Request, res: Response) => {
		addFeedback(req, res);
	};

	public list = async (req: Request, res: Response) => {
		listFeedbacks(req, res);
	};

	public delete = async (req: Request, res: Response) => {
		deleteFeedback(req, res);
	};
}

export default FeedbackController;
