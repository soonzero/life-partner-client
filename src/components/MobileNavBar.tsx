import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as HomeSVG } from 'static/icons/home.svg';
import { ReactComponent as UserSVG } from 'static/icons/user.svg';
import { ReactComponent as WriteSVG } from 'static/icons/write.svg';
import { ReactComponent as LoginSVG } from 'static/icons/login.svg';
import { ReactComponent as LogoutSVG } from 'static/icons/logout.svg';
import { ReactComponent as SignUpSVG } from 'static/icons/signup.svg';
import { ReactComponent as HistorySVG } from 'static/icons/history.svg';

const MobileNavBar = (props: { isLogin: boolean }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const logout = () => {
		if (window.confirm('로그아웃하시겠습니까?')) {
			sessionStorage.removeItem('token');
			navigate('/logout');
		}
	};

	return (
		<nav className="px-4 sticky bottom-0 left-0 right-0 md:hidden z-10 bg-gray-50 w-full h-16 border-t-1 text-gray-300 fill-gray-300 dark:bg-dark">
			<ul className="horizontal items-center justify-around">
				{props.isLogin ? (
					<>
						<li
							className={classNames('flex-1 text-xs h-16 vertical center', {
								'text-gray-300 fill-gray-300':
									pathname.split('/')[1] !== 'posts',
								'text-main fill-main font-bold':
									pathname.split('/')[1] === 'posts',
							})}
						>
							<Link
								to="/posts/write"
								className="w-max cursor-pointer vertical center"
							>
								<span className="mb-1">
									<WriteSVG className="h-5 w-5" />
								</span>
								<span>파트너 구하기</span>
							</Link>
						</li>
						<li
							className={classNames('flex-1 text-xs h-16 vertical center', {
								'text-gray-300 fill-gray-300':
									pathname.split('/')[1] !== 'mypage' ||
									pathname.split('/')[2] !== 'history',
								'text-main fill-main font-bold':
									pathname.split('/')[1] === 'mypage' &&
									pathname.split('/')[2] === 'history',
							})}
						>
							<Link
								to="/mypage/history"
								className="w-max cursor-pointer vertical center"
							>
								<span className="mb-1">
									<HistorySVG className="h-5 w-5" />
								</span>
								<span>이용 내역</span>
							</Link>
						</li>
					</>
				) : (
					<li
						className={classNames('flex-1 text-xs h-16 vertical center', {
							'text-gray-300 fill-gray-300': pathname.split('/')[1] !== 'posts',
							'text-main fill-main font-bold':
								pathname.split('/')[1] === 'signup',
						})}
					>
						<Link to="/signup" className="w-max cursor-pointer vertical center">
							<span className="mb-1">
								<SignUpSVG className="h-5 w-5" />
							</span>
							<span>회원가입</span>
						</Link>
					</li>
				)}
				<li
					className={classNames('flex-1 text-xs h-16 vertical center', {
						'text-gray-300 fill-gray-300': pathname !== '/',
						'text-main fill-main font-bold': pathname === '/',
					})}
				>
					<Link to="/" className="w-max cursor-pointer vertical center">
						<span className="mb-1">
							<HomeSVG className="w-5 h-5" />
						</span>
						<span>홈</span>
					</Link>
				</li>
				{props.isLogin ? (
					<>
						<li
							className={classNames('flex-1 text-xs h-16 vertical center', {
								'text-gray-300 fill-gray-300':
									pathname.split('/')[1] !== 'mypage' ||
									pathname.split('/')[2] !== 'history',
								'text-main fill-main font-bold':
									pathname.split('/')[1] === 'mypage' &&
									pathname.split('/')[2] !== 'history',
							})}
						>
							<Link
								to="/mypage/profile"
								className="w-max cursor-pointer vertical center"
							>
								<span className="mb-1">
									<UserSVG className="w-4 h-4" />
								</span>
								<span>마이 페이지</span>
							</Link>
						</li>
						<li
							className={classNames('flex-1 text-xs h-16 vertical center', {
								'text-gray-300 fill-gray-300':
									pathname.split('/')[1] !== 'logout',
								'text-main fill-main font-bold':
									pathname.split('/')[1] === 'logout',
							})}
						>
							<div
								className="w-max cursor-pointer vertical center"
								onClick={logout}
							>
								<span className="mb-1">
									<LogoutSVG className="w-4 h-4" />
								</span>
								<span>로그아웃</span>
							</div>
						</li>
					</>
				) : (
					<li
						className={classNames('flex-1 text-xs h-16 vertical center', {
							'text-gray-300 fill-gray-300': pathname.split('/')[1] !== 'login',
							'text-main fill-main font-bold':
								pathname.split('/')[1] === 'login',
						})}
					>
						<Link to="/login" className="w-max cursor-pointer vertical center">
							<span className="mb-1">
								<LoginSVG className="w-4 h-4" />
							</span>
							<span>로그인</span>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default MobileNavBar;
