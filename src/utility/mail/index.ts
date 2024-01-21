import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../../../config/config';
import Logger from '../logger/logger';
// Responsible for sending mail
const sendEmail = async (emailTo: string, subject: string, content: string) => {
	const connection = createEmailConnection();
	await connection
		.sendMail({
			from: 'abc@yopmail.com',
			to: emailTo,
			subject: subject,
			html: content,
		})
		.then((res) => {
			return true;
		})
		.catch((err) => {
			Logger.error(err);
			return false;
		});
};

// Responsible for mail connection
const createEmailConnection = () => {
	return nodemailer.createTransport({
		host: EMAIL_CONFIG.host,
		port: EMAIL_CONFIG.port,
		secure: EMAIL_CONFIG.secure,
		auth: {
			user: EMAIL_CONFIG.user,
			pass: EMAIL_CONFIG.pass,
		},
		debug: true,
	});
};

export default sendEmail;
