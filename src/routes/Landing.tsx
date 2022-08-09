import Layout from 'components/Layout';
import Typing from 'react-kr-typing-anim';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from 'components/Card';
import { Post } from 'types/types';
import { Link } from 'react-router-dom';
import Floating from 'components/Floating';

const Landing = () => {
	const [display, setDisplay] = useState(false);

	const getAllPosts = async () => {
		const {
			data: { articles },
		} = await axios({
			method: 'GET',
			url: `http://15.164.225.61/api/articles`,
			headers: {
				authorization: sessionStorage.getItem('token')
					? `Bearer ${sessionStorage.getItem('token')}`
					: `NOT user`,
			},
		});
		return articles;
	};

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setDisplay(true);
		} else {
			setDisplay(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const { isSuccess, data } = useQuery(['preview'], getAllPosts);

	return (
		<Layout sideMenu noPadding pageTitle="홈">
			<section className="dark:divide-y-1 pb-3 select-none">
				<article className="relative landing-article md:h-max h-[calc(100vh-177px)] flex center overflow-hidden">
					<h1 className="absolute landing-h1 my-6 leading-relaxed z-10 md:text-white">
						번거로운 일은, <br />
						문제 해결사{' '}
						<Typing
							Tag="strong"
							cursor
							preDelay={1500}
							className="landing-h1 text-main font-bold"
						>
							라이프파트너
						</Typing>
						에게.
					</h1>
					<video
						loop
						muted
						autoPlay
						playsInline
						className="invisible md:visible object-contain w-full"
					>
						<source
							src="
						https://user-images.githubusercontent.com/95613159/183584198-27dea6a9-1c75-41aa-ac54-1ee68487337a.mp4"
							type="video/mp4"
						/>
					</video>
				</article>
				<article className="landing-article grid grid-cols-3 p-4 md:p-8">
					<figure className="flex center col-span-2">
						<img
							src="https://user-images.githubusercontent.com/95613159/183299883-45e05843-3be8-4626-bd64-e763e8ce35ed.png"
							className="w-full"
						/>
					</figure>
					<figcaption className="md:px-12 vertical center">
						<h2 className="landing-h2 md:leading-snug">
							컴퓨터,
							<br />
							노트북,
							<br />
							태블릿,
							<br />
							스마트폰까지.
							<br />
							<br />
							<span className="text-main font-bold">여러 기기</span>에서
							<br /> 사용할 수 있어요.
						</h2>
					</figcaption>
				</article>
				<article className="relative landing-article grid grid-cols-3 p-4 md:p-8">
					<figcaption className="vertical center">
						<h2 className="landing-h2 text-right md:leading-relaxed">
							지금 바로
							<br />
							<span className="text-main font-bold">대전광역시</span>에서
							<br />
							만나보세요.
							<br />
						</h2>
					</figcaption>
					<figure className="flex center col-span-2">
						<img
							src="https://user-images.githubusercontent.com/95613159/183292832-370e1907-076b-4747-b087-955ba5504776.png"
							className="w-full rounded-xl"
						/>
					</figure>
					<span className="absolute bottom-0 right-4 text-[0.5rem] sm:text-[0.6rem] md:bottom-2 md:right-8 md:text-xs text-gray-400">
						이용 가능 지역은 추후 확대 예정입니다.
					</span>
				</article>
				{isSuccess && (
					<article className="relative landing-article grid grid-cols-3 p-4 md:p-8 overflow-hidden">
						<figure className="overflow-scroll w-full col-span-2 snap-x snap-mandatory">
							<div className="flex center w-max space-x-3 snap-x snap-mandatory">
								{data &&
									data.slice(0, 6).map((d: Post) => (
										<div key={d.id} className="w-60 snap-center snap-always">
											<Card item={d} detail={false} preview />
										</div>
									))}
							</div>
						</figure>
						<figcaption className="vertical center">
							<h2 className="landing-h2 md:leading-relaxed">
								<span className="text-gray-400">미리보기</span>
								<br />
								<br />
								<Link to="/signup" className="text-main font-bold">
									회원가입
								</Link>{' '}
								후
								<br />
								이용할 수 있어요.
							</h2>
						</figcaption>
					</article>
				)}
			</section>
			<Floating display={display} />
		</Layout>
	);
};

export default Landing;
