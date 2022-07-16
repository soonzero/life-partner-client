import Card from 'components/Card';
import dummyData from 'data/dummyData';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';

const Main = () => {
	const priceList = dummyData.cards.map((i) => i.price);
	const periodList = dummyData.cards.map((i) => i.period);
	const [minPrice, maxPrice] = [Math.min(...priceList), Math.max(...priceList)];
	const [minPeriod, maxPeriod] = [
		Math.min(...periodList),
		Math.max(...periodList),
	];

	// 게시글 불러오기 api 연동하고, isUser가 true면 글쓰기 버튼 보여주기

	return (
		<Layout noShadow floating>
			<section className="vertical">
				<div className="flex mb-3 justify-between items-center">
					<h1>파트너를 구해요</h1>
					<Link to="/articles/write">
						<button type="button" className="btn-primary">
							파트너 구하기
						</button>
					</Link>
				</div>
				<Filter price={[minPrice, maxPrice]} period={[minPeriod, maxPeriod]} />
				<article className="grid grid-cols-4 gap-3">
					{dummyData.cards.map((i) => (
						<Card key={i.id} item={i} detail={false} />
					))}
				</article>
			</section>
		</Layout>
	);
};

export default Main;
