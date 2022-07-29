import axios from 'axios';
import BreakDown from 'components/BreakDown';
import Layout, { MyPageLayout } from 'components/Layout';
import Partner from 'components/Partner';
import Sidebar from 'components/SideBar';
import { useEffect, useState } from 'react';
import { Post } from 'types/types';

const History = () => {
	const [list, setList] = useState<Post[]>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [articleId, setArticleId] = useState<number>();

	const getList = async () => {
		try {
			const authorization = `Bearer ${sessionStorage.getItem('token')}`;
			let nickname: string;
			const response = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/users/user-info',
				headers: {
					authorization,
				},
			});
			nickname = response.data.nickname;

			const {
				data: { articles },
			} = await axios({
				method: 'GET',
				url: `http://15.164.225.61/api/articles/search?minprice=2000&maxperiod=120&location1=* *&location2=not location&location3=not location`,
				headers: {
					authorization,
				},
			});
			setList((prev) =>
				articles.filter(
					(i: Post) => i.writer === nickname && i.status !== 'deleted'
				)
			);
		} catch (e) {
			console.log(e);
		}
	};

	const selectPartner = (articleId: number) => {
		setIsOpen(true);
		setArticleId((prev) => articleId);
	};

	useEffect(() => {
		getList();
	}, [isOpen]);

	return (
		<Layout noShadow>
			<section className="mypage-layout">
				<Sidebar currentMenu="나의 이용 내역" />
				<MyPageLayout>
					<h1>나의 이용 내역</h1>
					{list && (
						<table className="w-full text-sm text-center table-auto">
							<thead className="border-b-1">
								<tr className="font-medium">
									<td>게시글 등록일자</td>
									<td>게시글 제목</td>
									<td className="hidden md:table-cell">장소</td>
									<td className="hidden lg:table-cell">파트너</td>
									<td className="hidden lg:table-cell">관리</td>
								</tr>
							</thead>
							<tbody>
								{list.length > 0 ? (
									list.map((i) => (
										<BreakDown
											key={i.id}
											item={i}
											selectPartner={selectPartner}
											getList={getList}
										/>
									))
								) : (
									<tr>
										<td colSpan={5} className="p-2 font-medium">
											내역 없음
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</MyPageLayout>
			</section>
			{isOpen && (
				<Partner isOpen={isOpen} setIsOpen={setIsOpen} articleId={articleId} />
			)}
		</Layout>
	);
};

export default History;
