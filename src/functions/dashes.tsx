export const addDashes = (number: string) => {
	const phone = number.replace(/[^0-9]+/g, '');
	return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
};

export const leaveOnlyNumber = (number: string) => {
	const onlyNumber = number.replace(/[^0-9]+/g, '');
	return onlyNumber;
};
