import CryptoJS from 'crypto-js';

const GenerateAlphanumeric = (length: number) => {
  const charset =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const bytes = CryptoJS.lib.WordArray.random(length);

	for (let i = 0; i < length; i++) {
		const byte = bytes.words[i % bytes.words.length] >>> 0;
		result += charset[byte % charset.length];
	}

	return result;
};

export default GenerateAlphanumeric;
