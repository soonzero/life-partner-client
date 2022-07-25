import Card from 'components/Card';
import Filter from 'components/Filter';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from 'types/types';

const Main = () => {
	const [data, setData] = useState<Post[]>([]);
	const [isUser, setIsUser] = useState<boolean>();

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

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Layout noShadow floating>
			<section className="vertical">
				<div className="flex mb-3 justify-between items-center">
					<h1>파트너를 구해요</h1>
					{isUser && (
						<Link to="/posts/write">
							<button type="button" className="btn-primary">
								파트너 구하기
							</button>
						</Link>
					)}
				</div>
				<Filter price={[2000, 30000]} period={[10, 120]} />
				<article className="grid grid-cols-4 gap-3">
					{data?.map((i) => (
						<Card key={i.id} item={i} detail={false} />
					))}
				</article>
			</section>
		</Layout>
	);
};

export default Main;
