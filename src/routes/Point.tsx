import axios from 'axios';
import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import { addCommasToNumber } from 'functions/common';
import convertTime from 'functions/convertTime';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PointInfo } from 'types/types';

const Point = () => {
	const [data, setData] = useState<PointInfo>();

	const getData = async () => {
		try {
			const result = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/point',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			setData((prev) => result.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="포인트 상세 내역" />
				{data && (
					<MyPageLayout>
						<h1 className="mb-6">포인트 상세 내역</h1>
						<h3 className="mb-2">한 눈에 보기</h3>
						<table className="w-full border-collapse mb-6">
							<tbody>
								<tr>
									<td className="border-1 text-center">총 포인트</td>
									<td className="border-1 text-center">
										{addCommasToNumber(data.current_point)}
									</td>
								</tr>
								<tr>
									<td className="border-1 text-center">추후 적립 예정</td>
									<td className="border-1 text-center">
										{/* {addCommasToNumber()} */}
									</td>
								</tr>
								<tr>
									<td className="bg-main text-white border-1 text-center font-semibold">
										현재 사용 가능
									</td>
									<td className="bg-main text-white border-1 text-center font-semibold">
										{addCommasToNumber(data.current_point)}
									</td>
								</tr>
							</tbody>
						</table>
						<h3 className="mb-2">세부 내역</h3>
						<table className="w-full border-collapse mb-6">
							<thead>
								<tr>
									<td className="text-center border-1 text-sm h-8">날짜</td>
									<td className="text-center border-1 text-sm h-8">내역</td>
									<td className="text-center border-1 text-sm h-8">포인트</td>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-main text-white">
									<td className="border-1 h-10 text-center text-sm">
										{convertTime(new Date())}
									</td>
									<td className="border-1 h-10 text-center text-sm">
										현재 사용 가능 포인트
									</td>
									<td className="border-1 h-10 pr-3 text-right text-sm font-semibold">
										{addCommasToNumber(data.current_point)}
									</td>
								</tr>
								{data.history.map((i) => {
									return (
										<tr key={i.id}>
											<td className="border-1 h-10 text-center text-sm">
												{i.date}
											</td>
											<td className="border-1 h-10 text-center text-sm">
												<Link to={`/articles/${i.id}`}>제목</Link>
											</td>
											<td className="border-1 h-10 pr-3 text-right text-sm font-semibold">
												{i.point_earned > 0 ? `+ ` : `- `}
												{addCommasToNumber(Math.abs(i.point_earned))}
											</td>
										</tr>
									);
								})}
								<tr>
									<td className="border-1 h-10 text-center text-sm">
										회원가입
									</td>
									<td className="border-1 h-10 text-center text-sm">
										회원가입
									</td>
									<td className="border-1 h-10 pr-3 text-right text-sm font-semibold">
										+ {addCommasToNumber(1000)}
									</td>
								</tr>
							</tbody>
						</table>
					</MyPageLayout>
				)}
			</section>
		</Layout>
	);
};

export default Point;
