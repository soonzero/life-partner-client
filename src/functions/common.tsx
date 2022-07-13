export const addCommasToNumber = (num: number) => {
	const numberReg = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(numberReg, ',');
};
