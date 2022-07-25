import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import classNames from 'classnames';

const Header = (props: { noShadow?: boolean }) => {
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
			className={classNames(
				'mx-auto sticky top-0 xs:px-4 sm:px-8 transition z-[5]',
				{
					'shadow-main bg-main': shadow && !props.noShadow,
					'border-b bg-white': !shadow,
					'shadow-none bg-white': props.noShadow,
				}
			)}
		>
			<NavBar shadow={shadow} noShadow={props.noShadow} />
		</header>
	);
};

export default Header;
