import { useReducer } from 'react';
import { useCallback, ChangeEvent } from 'react';
import { LoginForm, Action, PasswordChangeForm } from 'types/types';

function reducer(state: LoginForm | PasswordChangeForm, action: Action) {
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

const useInputs: LoginForm | PasswordChangeForm | any = (
	initialForm: LoginForm | PasswordChangeForm
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
