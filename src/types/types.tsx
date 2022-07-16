export type MapInCard = {
	item: {
		id: number;
		period: number;
		price: number;
		location: string;
		contents: string;
	};
	detail: boolean;
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

export type CurrentMenu = {
	currentMenu: string;
};

export type Article = {
	title: string;
	contents: string;
	period: number;
	price: number;
	location: string;
	detail_location: string;
	use_point: number;
	point_earned: number;
	post_bank: string;
	post_account: string;
	post_holder: string;
};
