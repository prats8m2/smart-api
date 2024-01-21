import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import sendEmail from '.';
import Logger from '../logger/logger';

// Responsible for sending mail
const welcomeEmailToClientAdmin = async (
	emailTo: string,
	clientAdminName: string,
	username: string,
	password: string
) => {
	try {
		const filePath = path.join(
			__dirname,
			'../../../public/emailTemplate/welcome-email-clientAdmin.html'
		);
		const source = fs.readFileSync(filePath, 'utf-8').toString();
		const template = handlebars.compile(source);
		// const PATH = path.join(__dirname + `../../../../public/images`);
		const PATH = `https://d2qcfls7p39rv.cloudfront.net`;

		const replacements = {
			PATH,
			clientAdminName,
			username,
			password,
		};
		const htmlToSend = template(replacements);

		return await sendEmail(emailTo, 'Welcome to UltraAnalytics', htmlToSend);
	} catch (_e) {
		Logger.error('~ _e', _e);
	}
};

export default welcomeEmailToClientAdmin;
