const addDashes = (number: string) => {
	const phone = number.replace(/[^0-9]+/g, '');
	return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
};

export default addDashes;
