import { useReducer } from 'react';
import { useCallback, ChangeEvent } from 'react';

type signUpForm = {
	nickname: string;
	password: string;
	passwordConfirm: string;
	phone: string;
	detailAddress: string;
	bank: string;
	account: string;
	holder: string;
};

type Action = { type: 'CHANGE_INPUT'; id: string; value: string };

function reducer(state: signUpForm, action: Action) {
	switch (action.type) {
		case 'CHANGE_INPUT':
			return {
				...state,
				[action.id]: action.value,
			};
		default:
			return state;
	}
}

const useInputs: signUpForm | any = (initialForm: signUpForm) => {
	const [form, dispatch] = useReducer(reducer, initialForm);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const { id, value } = e.target;
			dispatch({
				type: 'CHANGE_INPUT',
				id,
				value,
			});
		},
		[]
	);

	return [form, onChange];
};

export default useInputs;
