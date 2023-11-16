import { Request, Response } from 'express';
import sendResponse from '../../utility/response';
import { createToken } from '../../utility/jwt';
import MD5 from 'md5'; // Importing the MD5 hashing library.
import Logger from '../../utility/logger/logger';
import { User } from '../../db/entity/user.entity'; // Importing the User entity from a database.
import { CODE } from '../../../config/config'; // Importing a CODE constant from a configuration file.

const login = async (req: Request, res: Response) => {
	// Fetch data from the request body.
	const { email, username, password } = req.body;
	Logger.info(`Login request`); // Logging a login request.

	// Attempt to find a user in the database using the provided username and password or email and password.
	const user: User = await User.findOne({
		where: [
			{ username, password: MD5(password) }, // Search by username and hashed password.
			{ email, password: MD5(password) }, // Search by email and hashed password.
		],
		relations: ['role', 'role.permissions'], // Include related data like the user's role and permissions.
	});

	// If no user is found, respond with an error and exit.
	if (!user) {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'Invalid credentials');
		return;
	}

	// If the user's account is deactivated, respond with an error and exit.
	if (!user?.account?.status) {
		sendResponse(res, false, CODE.UNAUTHORIZED, 'User account deactivated');
		return;
	}

	// Prepare a token object containing user information to generate a JSON Web Token (JWT).
	const tokenObject = {
		id: user.id,
		name: `${user.firstName} ${user.lastName ?? ''}`,
		role: user.role,
		email: user.email,
		username: user.username,
		isFirstLogin: user.isFirstLogin,
		account: user.account,
	};

	// Update user information such as last login time and isFirstLogin status.
	user.lastLogin = new Date();
	user.isFirstLogin = false;
	await user.save(); // Save the changes to the user in the database.

	// Generate a JWT using the token object.
	const token = createToken(tokenObject);

	// Respond with a success message and the user data along with the token.
	sendResponse(res, true, CODE.SUCCESS, `Login Successful`, { user, token });
};;;;;;;;

export default login;
