import Card, { LoadingCard } from 'components/Card';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useState, useReducer } from 'react';
import axios from 'axios';
import { Condition, Post } from 'types/types';
import { conditionReducer, initialCondition } from 'reducer/conditionReducer';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
	const [isUser, setIsUser] = useState(sessionStorage.getItem('token'));
	const [state, dispatch] = useReducer(conditionReducer, initialCondition);

	const getPostsFiltered = async (condition: Condition) => {
		if (sessionStorage.getItem('token')) {
			const {
				data: { articles },
			} = await axios({
				method: 'GET',
				url: `http://15.164.225.61/api/articles/search?minprice=${condition.minPrice}&maxperiod=${condition.maxPeriod}&location1=${condition.location[0]}&location2=${condition.location[1]}&location3=${condition.location[2]}`,
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			return articles.filter((a: Post) => a.status === 'waiting');
		} else {
			setIsUser(null);
		}
	};

	const { isFetching, data } = useQuery(
		['posts', state],
		() => getPostsFiltered(state),
		{
			staleTime: 5000,
			refetchOnWindowFocus: true,
			cacheTime: 10000,
		}
	);

	const getPosts = () => {
		getPostsFiltered(state);
	};

	return (
		<Layout noShadow floating sideMenu pageTitle="메인">
			<section>
				{isUser && (
					<>
						<div className="flex mb-3 justify-between items-center">
							<h1 className="text-2xl md:text-3xl mb-0">파트너를 구해요</h1>
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
							state={state}
							dispatch={dispatch}
							getPosts={getPosts}
						/>
						<article className="grid gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 min-h-screen">
							{data &&
								data?.map((i: Post) => (
									<Card key={i.id} item={i} detail={false} />
								))}
							{isFetching && (
								<>
									<LoadingCard />
									<LoadingCard />
									<LoadingCard />
									<LoadingCard />
									<LoadingCard />
									<LoadingCard />
								</>
							)}
						</article>
					</>
				)}
			</section>
		</Layout>
	);
};

export default Main;
