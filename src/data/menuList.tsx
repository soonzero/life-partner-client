const menuList = {
	floatingMenu: {
		isUser: [
			['내 정보', '/mypage/profile'],
			['파트너 구하기', '/posts/write'],
		],
		isNotUser: [
			['로그인', '/login'],
			['회원가입', '/signup'],
		],
	},
	sideBarMenu: [
		['내 정보', '/mypage/profile'],
		['나의 이용 내역', '/mypage/history'],
		['포인트 상세 내역', '/mypage/point'],
		['회원정보 수정', '/mypage/change/info'],
		['비밀번호 변경', '/mypage/change/password'],
		['회원 탈퇴', '/mypage/delete-account'],
	],
};

export default menuList;
