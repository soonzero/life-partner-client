import classNames from 'classnames';
import { Dispatch, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseSVG } from 'static/icons/close.svg';
import ThemeChanger from './ThemeChanger';

const SideMenu = (props: {
	isOpen: boolean;
	setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();

	const logout = () => {
		props.setIsOpen(false);
		sessionStorage.removeItem('token');
		navigate('/logout');
	};

	return (
		<aside
			className={classNames(
				'z-20 fixed top-0 left-0 right-0 bottom-0 bg-transparent transition',
				{
					visible: props.isOpen,
					invisible: !props.isOpen,
				}
			)}
		>
			<div
				className={classNames(
					'fixed top-0 left-0 right-0 bottom-0 transition',
					{
						'bg-black bg-opacity-30': props.isOpen,
						'bg-transparent bg-opacity-100': !props.isOpen,
					}
				)}
				onClick={() => props.setIsOpen(false)}
			/>
			<div
				className={classNames(
					'bg-white w-80 fixed top-0 bottom-0 right-0 transition py-20 px-8 dark:bg-dark dark:text-white',
					{
						'translate-x-0 opacity-100': props.isOpen,
						'translate-x-full opacity-0': !props.isOpen,
					}
				)}
			>
				<span
					className="absolute top-5 left-5 cursor-pointer dark:text-white text-dark"
					onClick={() => props.setIsOpen(false)}
				>
					<CloseSVG />
				</span>
				<ThemeChanger sidemenu />
				{!sessionStorage.getItem('token') ? (
					<ul className="vertical items-center space-y-2">
						<li className="sidemenu-btn" onClick={() => navigate('/login')}>
							로그인
						</li>
						<li className="sidemenu-btn" onClick={() => navigate('/signup')}>
							회원가입
						</li>
					</ul>
				) : (
					<div className="vertical text-dark dark:text-white">
						<ul className="vertical pb-6 items-center space-y-2">
							<li className="sidemenu-btn" onClick={logout}>
								로그아웃
							</li>
						</ul>
						<div className="vertical space-y-3 py-6 border-b-1">
							<h3>파트너</h3>
							<ul className="vertical space-y-1">
								<li
									className="cursor-pointer"
									onClick={() => navigate('/main')}
								>
									게시글 탐색
								</li>
								<li
									className="cursor-pointer"
									onClick={() => navigate('/posts/write')}
								>
									파트너 구하기
								</li>
							</ul>
						</div>
						<div className="vertical space-y-3 py-6 border-b-1">
							<h3>마이 페이지</h3>
							<ul className="vertical space-y-1">
								<li
									className="cursor-pointer"
									onClick={() => navigate('/mypage/profile')}
								>
									내 정보
								</li>
								<li
									className="cursor-pointer"
									onClick={() => navigate('/mypage/change/info')}
								>
									회원 정보 수정
								</li>
								<li
									className="cursor-pointer"
									onClick={() => navigate('/mypage/history')}
								>
									최근 이용 내역
								</li>
								<li
									className="cursor-pointer"
									onClick={() => navigate('/mypage/point')}
								>
									포인트 이용 내역
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</aside>
	);
};

export default SideMenu;
