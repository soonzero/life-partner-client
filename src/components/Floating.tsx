import { ReactComponent as User } from 'static/icons/user.svg';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import subMenuList from 'data/subMenuList';

const Floating = () => {
	const navigate = useCallback(useNavigate(), []);

	const [subMenu, setSubMenu] = useState<boolean>(false);

	// 로그인 o/x api 연동
	const [isUser, setIsUser] = useState<boolean>(false);

	return (
		<div className="fixed bottom-10 right-10 shadow-main rounded-full transition">
			<span
				className="w-12 h-12 flex center rounded-full hover:bg-white border-main fill-white border-1 hover:border-1 hover:fill-main bg-main cursor-pointer transition"
				onClick={() => setSubMenu((prev) => !prev)}
			>
				<User className="w-5 h-5" />
			</span>
			{subMenu && (
				<ul className="absolute bottom-14 right-0 rounded-lg border-1 w-max divide-y-1 overflow-hidden">
					{(isUser ? subMenuList.isUser : subMenuList.isNotUser).map(
						([title, url], index) => (
							<li
								key={index}
								className="pl-3 py-2 pr-8 bg-white hover:bg-gray-200 cursor-pointer"
								onClick={() => navigate(url)}
							>
								{title}
							</li>
						)
					)}
				</ul>
			)}
		</div>
	);
};

export default Floating;
