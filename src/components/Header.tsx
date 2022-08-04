import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import classNames from 'classnames';

const Header = (props: { noShadow?: boolean; sideMenu?: boolean }) => {
	const [shadow, setShadow] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setShadow(true);
		} else {
			setShadow(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={classNames({
				'shadow-main bg-main': shadow && !props.noShadow,
				'border-b bg-white': !shadow,
				'shadow-none bg-white': props.noShadow,
			})}
		>
			<NavBar
				shadow={shadow}
				noShadow={props.noShadow}
				sideMenu={props.sideMenu}
			/>
		</header>
	);
};

export default Header;
