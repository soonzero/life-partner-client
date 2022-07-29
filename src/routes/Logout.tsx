import Layout from 'components/Layout';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const moveToMain = setTimeout(() => navigate('/'), 5000);

		return () => {
			clearTimeout(moveToMain);
		};
	});

	return (
		<Layout pageTitle="로그아웃">
			<section className="flex h-[calc(100vh-89px)] vertical center mt-0">
				<h1>로그아웃이 완료되었습니다.</h1>
				<h2 className="text-sm md:text-base">
					5초 뒤 메인화면으로 이동됩니다.
				</h2>
				<p className="text-gray-400 text-xs md:text-sm">
					<Link to="/" className="text-main">
						여기
					</Link>
					를 누르면 바로 메인화면으로 이동합니다.
				</p>
			</section>
		</Layout>
	);
};
export default Logout;
