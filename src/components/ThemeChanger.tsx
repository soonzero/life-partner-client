import { useState, useEffect, MouseEvent } from 'react';
import classNames from 'classnames';
import { ReactComponent as LightSVG } from 'static/icons/light.svg';
import { ReactComponent as DarkSVG } from 'static/icons/dark.svg';
import { ReactComponent as SystemSVG } from 'static/icons/system.svg';

const ThemeChanger = (props: {
	shadow?: boolean;
	noShadow?: boolean | undefined;
	sidemenu?: boolean;
}) => {
	const [modeOpen, setModeOpen] = useState<boolean>(false);
	const [mode, setMode] = useState<string>('system');

	const changeMode = (e: MouseEvent<HTMLLIElement>) => {
		const target = e.currentTarget.id;
		if (target === 'light') {
			setMode('light');
			sessionStorage.setItem('theme', 'light');
		} else if (target === 'dark') {
			setMode('dark');
			sessionStorage.setItem('theme', 'dark');
		} else if (target === 'system') {
			setMode('system');
			sessionStorage.removeItem('theme');
		}
		setModeOpen(false);
	};

	const changeTheme = () => {
		const themeNow = sessionStorage.getItem('theme');
		const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';
		if (mode === 'system') {
			if (deviceTheme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} else if (mode === 'dark' && themeNow === 'dark') {
			document.documentElement.classList.add('dark');
		} else if (mode === 'light' && themeNow === 'light') {
			document.documentElement.classList.remove('dark');
		}
	};

	useEffect(() => {
		changeTheme();
	}, [mode]);

	return (
		<div
			className={classNames('cursor-pointer dark:text-white text-dark', {
				'absolute top-5 right-5 pb-2': props.sidemenu,
				'text-white': props.shadow && !props.noShadow,
				'text-main': !props.shadow || props.noShadow,
			})}
			onMouseEnter={() => setModeOpen((prev) => !prev)}
			onMouseLeave={() => setModeOpen((prev) => false)}
		>
			{sessionStorage.theme === 'dark' ||
			(!('theme' in sessionStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
				<DarkSVG
					className={classNames({
						'w-6 h-6': !props.sidemenu,
						'w-5 h-5': props.sidemenu,
					})}
				/>
			) : (
				<LightSVG
					className={classNames({
						'w-6 h-6': !props.sidemenu,
						'w-5 h-5': props.sidemenu,
					})}
				/>
			)}
			<ul
				className={classNames(
					'absolute right-0 py-1 rounded w-max border-2 dark:bg-dark dark:text-white bg-white text-dark',
					{
						visible: modeOpen,
						hidden: !modeOpen,
						'top-full': props.sidemenu,
						'top-6': !props.sidemenu,
					}
				)}
			>
				<li className="dark-mode" id="dark" onClick={changeMode}>
					<DarkSVG />
					<span>다크 모드</span>
				</li>
				<li className="dark-mode" id="light" onClick={changeMode}>
					<LightSVG />
					<span>라이트 모드</span>
				</li>
				<li className="dark-mode" id="system" onClick={changeMode}>
					<SystemSVG />
					<span>시스템 설정</span>
				</li>
			</ul>
		</div>
	);
};
export default ThemeChanger;
