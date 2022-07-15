import { ReactNode } from 'react';
import Floating from 'components/Floating';
import Header from 'components/Header';

const Layout = (props: {
	children: ReactNode;
	noShadow?: boolean;
	floating?: boolean;
}) => {
	return (
		<>
			<Header noShadow={props.noShadow} />
			<main>{props.children}</main>
			{props.floating && <Floating />}
		</>
	);
};

export default Layout;
