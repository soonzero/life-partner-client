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
				'mx-auto sticky top-0 px-8 bg-white transition border-b z-[5]',
				{
					'shadow-main': shadow,
					'shadow-none': props.noShadow,
				}
			)}
		>
			<NavBar />
		</header>
	);
};

export default Header;
