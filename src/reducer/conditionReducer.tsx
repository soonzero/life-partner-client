import { Condition, ActionChangeRange } from 'types/types';

export const initialCondition = {
	minPrice: 2000,
	maxPeriod: 120,
	location: ['* *', 'not location', 'not location'],
};

export const conditionReducer = (
	state: Condition,
	action: ActionChangeRange
) => {
	switch (action.type) {
		case 'CHANGE_PRICE':
			return {
				...state,
				minPrice: action.value,
			};
		case 'CHANGE_PERIOD':
			return {
				...state,
				maxPeriod: action.value,
			};
		case 'CHANGE_LOCATION':
			let newLocation = [...action.value];
			if (newLocation.length === 0) {
				newLocation = ['* *', 'not location', 'not location'];
			} else if (newLocation.length === 1) {
				newLocation = [...action.value, 'not location', 'not location'];
			} else if (newLocation.length === 2) {
				newLocation = [...action.value, 'not location'];
			}
			return {
				...state,
				location: [...newLocation],
			};
		default:
			return state;
	}
};

export default conditionReducer;
