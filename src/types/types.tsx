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
	detailAddress: string;
	bank: string;
	account: string;
	holder: string;
}

export interface PasswordChangeForm {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

export interface Action {
	type: 'CHANGE_INPUT';
	id: string;
	value: string;
}

export interface CurrentMenu {
	currentMenu: string;
}

export interface NewPost extends Post {
	detail_location: string;
	use_point: number;
	point_earned: number;
	post_bank: string;
	post_account: string;
	post_holder: string;
}
