import { randomBytes } from 'crypto';

const GenerateAlphanumeric = (length: number) => {
	const charset =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const bytes = randomBytes(length);

	for (let i = 0; i < length; i++) {
		const byte = bytes[i];
		result += charset[byte % charset.length];
	}

	return result;
};
export default GenerateAlphanumeric;
