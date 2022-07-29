import { ReactComponent as User } from 'static/icons/user.svg';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuList from 'data/menuList';

const Floating = (props: { isLogin: boolean }) => {
	const navigate = useCallback(useNavigate(), []);

	const [subMenu, setSubMenu] = useState<boolean>(false);

	// 로그인 o/x api 연동
	const [isUser, setIsUser] = useState<boolean>(props.isLogin);

	const logout = () => {
		window.sessionStorage.removeItem('token');
		setSubMenu(false);
		setIsUser(false);
		navigate('/logout');
	};

	return (
		<div className="fixed bottom-5 right-5 shadow-main rounded-full transition z-10 sm:bottom-10 sm:right-10 visible md:invisible">
			<span
				className="group w-12 h-12 flex center rounded-full hover:bg-white border-transparent fill-white border-1 hover:border-main bg-main cursor-pointer transition"
				onClick={() => setSubMenu((prev) => !prev)}
			>
				<User className="w-5 h-5 group-hover:fill-main" />
			</span>
			{subMenu && (
				<ul className="absolute bottom-14 right-0 rounded-lg border-1 w-max divide-y-1 overflow-hidden text-sm sm:text-base">
					{(isUser
						? menuList.floatingMenu.isUser
						: menuList.floatingMenu.isNotUser
					).map(([title, url], index) => (
						<li
							key={index}
							className="pl-3 py-2 pr-8 bg-white hover:bg-gray-200 cursor-pointer"
							onClick={() => navigate(url)}
						>
							{title}
						</li>
					))}
					{isUser && (
						<li
							className="pl-3 py-2 pr-8 bg-white hover:bg-gray-200 cursor-pointer"
							onClick={logout}
						>
							로그아웃
						</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default Floating;
