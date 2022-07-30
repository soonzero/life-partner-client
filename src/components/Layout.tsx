import { ReactNode, useState } from 'react';
import Floating from 'components/Floating';
import Header from 'components/Header';
import { Helmet } from 'react-helmet';

const Layout = (props: {
	children: ReactNode;
	pageTitle: string;
	noShadow?: boolean;
	sideMenu?: boolean;
	floating?: boolean;
}) => {
	const [isLogin, setIsLogin] = useState(
		sessionStorage.getItem('token') ? true : false
	);

	return (
		<>
			<Helmet>
				<title>{props.pageTitle} | 라이프파트너</title>
			</Helmet>
			<Header noShadow={props.noShadow} sideMenu={props.sideMenu} />
			<main>{props.children}</main>
			{props.floating && <Floating isLogin={isLogin} />}
		</>
	);
};

export default Layout;

export const MyPageLayout = (props: { children: ReactNode }) => {
	return (
		<article className="grow border-2 border-main p-3 sm:p-6 rounded-xl dark:bg-dark dark:text-white">
			{props.children}
		</article>
	);
};
