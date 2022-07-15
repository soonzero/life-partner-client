import Card from 'components/Card';
import Floating from 'components/Floating';
import Header from 'components/Header';
import dummyData from 'data/dummyData';
import Filter from 'components/Filter';

const Main = () => {
	const priceList = dummyData.cards.map((i) => i.price);
	const periodList = dummyData.cards.map((i) => i.period);
	const [minPrice, maxPrice] = [Math.min(...priceList), Math.max(...priceList)];
	const [minPeriod, maxPeriod] = [
		Math.min(...periodList),
		Math.max(...periodList),
	];

	return (
		<>
			<Header noShadow />
			<main>
				<section className="vertical">
					<h1 className="mb-3">파트너를 구해요</h1>
					<Filter
						price={[minPrice, maxPrice]}
						period={[minPeriod, maxPeriod]}
					/>
					<article className="grid grid-cols-4 gap-3">
						{dummyData.cards.map((i) => (
							<Card key={i.id} item={i} detail={false} />
						))}
					</article>
				</section>
			</main>
			<Floating />
		</>
	);
};

export default Main;
