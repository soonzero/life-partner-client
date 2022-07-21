const convertTime = (date: Date) => {
	const year = date.getFullYear();
	const month = () => {
		if (date.getMonth() + 1 < 10) {
			return `0${date.getMonth() + 1}`;
		} else {
			return date.getMonth() + 1;
		}
	};
	const day = () => {
		const dayCount = date.getDate();
		if (dayCount < 10) {
			return `0${dayCount}`;
		} else {
			return dayCount;
		}
	};

	return `${year}-${month()}-${day()}`;
};

export default convertTime;
