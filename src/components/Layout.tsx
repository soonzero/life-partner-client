import { ReactNode, useState } from 'react';
import Floating from 'components/Floating';
import Header from 'components/Header';

const Layout = (props: {
	children: ReactNode;
	noShadow?: boolean;
	floating?: boolean;
}) => {
	const [isLogin, setIsLogin] = useState(
		sessionStorage.getItem('token') ? true : false
	);

	return (
		<>
			<Header noShadow={props.noShadow} />
			<main>{props.children}</main>
			{props.floating && <Floating isLogin={isLogin} />}
		</>
	);
};

export default Layout;

export const MyPageLayout = (props: { children: ReactNode }) => {
	return (
		<article className="grow border-2 border-main p-6 rounded-xl">
			{props.children}
		</article>
	);
};
