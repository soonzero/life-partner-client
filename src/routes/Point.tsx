import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import dummyData from 'data/dummyData';
import { addCommasToNumber } from 'functions/common';
import convertTime from 'functions/convertTime';
import { Link } from 'react-router-dom';

const Point = () => {
	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="포인트 상세 내역" />
				<MyPageLayout>
					<h1 className="mb-6">포인트 상세 내역</h1>
					<h3 className="mb-2">한 눈에 보기</h3>
					<table className="w-full border-collapse mb-6">
						<tbody>
							<tr>
								<td className="border-1 text-center">총 포인트</td>
								<td className="border-1 text-center">
									{addCommasToNumber(dummyData.user.current_point)}
								</td>
							</tr>
							<tr>
								<td className="border-1 text-center">추후 적립 예정</td>
								<td className="border-1 text-center">
									{addCommasToNumber(1400)}
								</td>
							</tr>
							<tr>
								<td className="bg-main text-white border-1 text-center font-semibold">
									현재 사용 가능
								</td>
								<td className="bg-main text-white border-1 text-center font-semibold">
									{addCommasToNumber(dummyData.user.current_point - 1400)}
								</td>
							</tr>
						</tbody>
					</table>
					<h3 className="mb-2">세부 내역</h3>
					<table className="w-full border-collapse mb-6">
						<thead>
							<tr>
								<td className="text-center border-1 text-sm h-8">
									적립/사용일
								</td>
								<td className="text-center border-1 text-sm h-8">
									적립/사용 내역
								</td>
								<td className="text-center border-1 text-sm h-8">
									적립/사용 포인트
								</td>
							</tr>
						</thead>
						<tbody>
							{dummyData.point_history.map((i) => {
								const idx = dummyData.posts.findIndex((p) => p.id === i.postId);
								return (
									<tr key={i.postId}>
										<td className="border-1 h-10 text-center text-sm">
											{convertTime(i.dateTime)}
										</td>
										<td className="border-1 h-10 text-center text-sm">
											<Link to={`/articles/${i.postId}`}>
												{dummyData.posts[idx].title}
											</Link>
										</td>
										<td className="border-1 h-10 pr-3 text-right text-sm font-semibold">
											{i.point_earned > 0 ? `+ ` : `- `}
											{addCommasToNumber(i.point_earned)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default Point;
