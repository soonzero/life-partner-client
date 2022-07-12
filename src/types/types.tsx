export type MapInCard = {
	index: number;
	lat: number;
	lon: number;
};

export type loginForm = {
	nickname: string;
	password: string;
};

export type signUpForm = {
	nickname: string;
	password: string;
	passwordConfirm: string;
	phone: string;
	detailAddress: string;
	bank: string;
	account: string;
	holder: string;
};

export type Action = { type: 'CHANGE_INPUT'; id: string; value: string };
