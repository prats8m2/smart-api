import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import { createToken } from '../../utility/jwt';
import MD5 from 'md5';
import Logger from '../../utility/logger';
import { User } from '../../db/entity/user.entity';
import { CODE } from '../../../config/config';

const login = async (req: Request, res: Response) => {
	//fetch data from body
	const { email, username, password } = req.body;
	Logger.info(`Login request`);

	const user: User = await User.findOne({
		where: [
			{ username, password: MD5(password) },
			{ email, password: MD5(password) },
		],
		relations: ['role', 'role.permissions'],
	});
	console.log('user:', user);

	if (!user) {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'Invalid credentials');
		return;
	}

	if (!user.status) {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'User account deactivated');
		return;
	}

	const tokenObject = {
		id: user.id,
		name: `${user.firstName} ${user.lastName ?? ''}`,
		role: user.role,
		email: user.email,
		username: user.username,
		isFirstLogin: user.isFirstLogin,
	};

	user.lastLogin = new Date();
	user.isFirstLogin = false;
	await user.save();
	const token = createToken(tokenObject);
	sendResponse(res, true, CODE.SUCCESS, `Login Successful`, { user, token });
};

export default login;
