const RANDOM_NUMBER = (digits: number) => {
	if (digits <= 0 || digits > 15) {
		throw new Error('Number of digits must be between 1 and 15');
	}

	const min = 10 ** (digits - 1);
	const max = 10 ** digits - 1;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default RANDOM_NUMBER;
