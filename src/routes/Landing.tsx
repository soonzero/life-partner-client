import Layout from 'components/Layout';
import Typing from 'react-kr-typing-anim';

const Landing = () => {
	return (
		<Layout sideMenu pageTitle="홈">
			<section className="dark:divide-y-1 space-y-6">
				<article className="landing-article md:h-[calc(100vh-90px)] h-[calc(100vh-145px)] flex center">
					<h1 className="landing-h1 my-6 leading-relaxed">
						번거로운 일은, <br />
						문제 해결사{' '}
						<Typing
							Tag="span"
							cursor
							preDelay={2000}
							className="landing-h1 text-main"
						>
							라이프파트너
						</Typing>
						에게.
					</h1>
				</article>
				<article className="landing-article grid grid-cols-2 p-4 md:p-8">
					<figure className="flex center">
						<img
							src="https://user-images.githubusercontent.com/95613159/183290235-cb7e8eaf-e779-4c38-958c-a28d412a4a13.png"
							className="w-full"
						/>
					</figure>
					<figcaption className="md:px-12 vertical center">
						<h2 className="landing-h2 md:leading-relaxed">
							노트북,
							<br />
							태블릿,
							<br />
							스마트폰까지.
							<br />
							<br />
							<span className="text-main">여러 기기</span>에서
							<br /> 사용할 수 있어요.
						</h2>
					</figcaption>
				</article>
				<article className="relative landing-article grid grid-cols-2 p-4 md:p-8">
					<figcaption className="vertical center">
						<h2 className="landing-h2 text-right md:leading-relaxed">
							지금 바로
							<br />
							<span className="text-main">대전광역시</span>에서
							<br />
							만나보세요.
							<br />
						</h2>
					</figcaption>
					<figure className="flex center">
						<img
							src="https://user-images.githubusercontent.com/95613159/183292832-370e1907-076b-4747-b087-955ba5504776.png"
							className="w-full"
						/>
					</figure>
					<span className="absolute bottom-0 right-4 text-[0.5rem] sm:text-[0.6rem] md:bottom-2 md:right-8 md:text-xs text-gray-400">
						이용 가능 지역은 추후 확대 예정입니다.
					</span>
				</article>
			</section>
		</Layout>
	);
};

export default Landing;
