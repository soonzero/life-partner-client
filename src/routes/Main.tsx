import Card from 'components/Card';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Condition, Post } from 'types/types';

const Main = () => {
	const [data, setData] = useState<Post[]>([]);
	const [isUser, setIsUser] = useState<string | boolean | null>(
		sessionStorage.getItem('token')
	);
	const [filter, setFilter] = useState<Condition>({
		minprice: 2000,
		maxperiod: 120,
		location1: '* *',
		location2: 'not location',
		location3: 'not location',
	});

	const getPostsFiltered = async (condition: Condition) => {
		if (sessionStorage.getItem('token')) {
			try {
				const {
					data: { articles },
				} = await axios({
					method: 'GET',
					url: `http://15.164.225.61/api/articles/search?minprice=${condition.minprice}&maxperiod=${condition.maxperiod}&location1=${condition.location1}&location2=${condition.location2}&location3=${condition.location3}`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				setData((prev) => articles.filter((a: Post) => a.status === 'waiting'));
			} catch (e) {
				console.log(e);
			}
		} else {
			setIsUser(false);
		}
	};

	useEffect(() => {
		getPostsFiltered(filter);
	}, [filter]);

	return (
		<Layout noShadow floating>
			<section>
				{isUser && (
					<>
						<div className="flex mb-3 justify-between items-center">
							<h1 className="text-2xl md:text-3xl">파트너를 구해요</h1>
							<Link to="/posts/write" className="hover:no-underline">
								<button
									type="button"
									className="btn-primary hidden sm:block hover:no-underline"
								>
									파트너 구하기
								</button>
							</Link>
						</div>
						<Filter
							price={[2000, 30000]}
							period={[10, 120]}
							setFilter={setFilter}
						/>
						<article className="grid gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
							{data?.map((i) => (
								<Card key={i.id} item={i} detail={false} />
							))}
						</article>
					</>
				)}
			</section>
		</Layout>
	);
};

export default Main;
