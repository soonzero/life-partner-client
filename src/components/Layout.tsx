import { ReactNode, useState, useEffect } from 'react';
import Header from 'components/Header';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import MobileNavBar from './MobileNavBar';

const Layout = (props: {
	children: ReactNode;
	pageTitle: string;
	noShadow?: boolean;
	sideMenu?: boolean;
	noFooter?: boolean;
	noPadding?: boolean;
}) => {
	const { pathname } = useLocation();

	const [isLogin, setIsLogin] = useState(
		sessionStorage.getItem('token') ? true : false
	);

	useEffect(() => {
		setIsLogin((prev) => (sessionStorage.getItem('token') ? true : false));
	}, [pathname]);

	return (
		<>
			<Helmet>
				<title>{props.pageTitle} | 라이프파트너</title>
			</Helmet>
			<Header noShadow={props.noShadow} sideMenu={props.sideMenu} />
			<main className={props.noPadding ? 'padding-none' : ''}>
				{props.children}
			</main>
			{!props.noFooter && <Footer />}
			<MobileNavBar isLogin={isLogin} />
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
