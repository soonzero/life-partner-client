export interface Post {
	id: number;
	period: number;
	price: number;
	location: string;
	title: string;
	contents: string;
}

export interface Map {
	id: number;
	location: string;
	detail: boolean;
}

export interface MapInPost {
	item: Post;
	detail: boolean;
}

export interface LoginForm {
	nickname: string;
	password: string;
}

export interface SignUpForm extends LoginForm {
	passwordConfirm: string;
	phone: string;
	address: string;
	detail_address: string;
	bank: string;
	account: string;
	holder: string;
	gu: string;
	dong: string;
}

export interface PasswordChangeForm {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

export interface ActionChangeInput {
	type: 'CHANGE_INPUT';
	id: string;
	value: string;
}

export interface CurrentMenu {
	currentMenu: string;
}

export interface NewPost extends Post {
	detail_location: string;
	gu: string;
	dong: string;
	use_point: number;
	point_earned: number;
	post_bank: string;
	post_account: string;
	post_holder: string;
}

// export interface Range {
// 	price: {
// 		minPrice: number;
// 		maxPrice?: number;
// 	};
// 	period: {
// 		minPeriod?: number;
// 		maxPeriod: number;
// 	};
// }

export interface Range {
	minPrice: number;
	maxPeriod: number;
}

// export interface ActionChangePrice {
// 	type: 'CHANGE_PRICE';
// 	id: string;
// 	value: number;
// }

// export interface ActionChangePeriod {
// 	type: 'CHANGE_PERIOD';
// 	id: string;
// 	value: number;
// }

export interface ActionChangeRange {
	type: 'CHANGE_PRICE' | 'CHANGE_PERIOD';
	value: number;
}

export interface Daejeon {
	[gu: string]: string[];
	대덕구: string[];
	중구: string[];
	동구: string[];
	서구: string[];
	유성구: string[];
}

export interface AccountInfo {
	nickname: string;
	phone: string;
	address: string;
	detail_address: string;
	bank: string;
	account: string;
	holder: string;
	current_point: number;
}
