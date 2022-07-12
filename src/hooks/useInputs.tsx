import { useReducer } from 'react';
import { useCallback, ChangeEvent } from 'react';
import { loginForm, signUpForm, Action } from 'types/types';

function reducer(state: signUpForm | loginForm, action: Action) {
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

const useInputs: signUpForm | loginForm | any = (
	initialForm: signUpForm | loginForm
) => {
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
