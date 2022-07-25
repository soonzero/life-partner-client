import Card from 'components/Card';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Condition, Post } from 'types/types';

const Main = () => {
	const [data, setData] = useState<Post[]>([]);
	const [isUser, setIsUser] = useState<boolean>();
	const [filter, setFilter] = useState<Condition>({
		minprice: 2000,
		maxperiod: 120,
		location1: '* *',
		location2: 'not location',
		location3: 'not location',
	});

	const getPosts = async () => {
		try {
			const { data } = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/articles',
				headers: {
					authorization: sessionStorage.getItem('token')
						? `Bearer ${sessionStorage.getItem('token')}`
						: 'NOT user',
				},
			});
			setData((prev) => data.articles);
			if (data.is_user) {
				setIsUser(true);
			}
		} catch (e) {
			setIsUser(false);
			console.log(e);
		}
	};

	const getFilteredPosts = async (condition: Condition) => {
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
			setData((prev) => articles);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (
			filter.minprice === 2000 &&
			filter.maxperiod === 120 &&
			filter.location1 === '* *' &&
			filter.location2 === 'not location' &&
			filter.location3 === 'not location'
		) {
			getPosts();
		} else {
			getFilteredPosts(filter);
		}
	}, [filter]);

	return (
		<Layout noShadow floating>
			<section className="vertical">
				<div className="flex mb-3 justify-between items-center">
					<h1>파트너를 구해요</h1>
					{isUser && (
						<Link to="/posts/write">
							<button type="button" className="btn-primary hidden sm:block">
								파트너 구하기
							</button>
						</Link>
					)}
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
			</section>
		</Layout>
	);
};

export default Main;
