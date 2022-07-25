import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';

const History = () => {
	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="나의 이용 내역" />
				<MyPageLayout>
					<h1 className="mb-6">나의 이용 내역</h1>
					<div className="flex items-center"></div>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default History;
