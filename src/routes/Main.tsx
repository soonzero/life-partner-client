import Card from 'components/Card';
import Floating from 'components/Floating';
import Header from 'components/Header';
import dummyData from 'data/dummyData';

const Main = () => {
	return (
		<>
			<Header />
			<main>
				<section className="vertical">
					<h1 className="mb-3">파트너를 구해요</h1>
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
