import Layout from 'components/Layout';
import NaverMap from 'components/NaverMap';
import dummyData from 'data/dummyData';
import { addCommasToNumber } from 'functions/common';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
	const navigate = useNavigate();
	const params = useParams();

	// 파트너 명단 조회 api
	const data = dummyData.posts.filter((p) => p.id === Number(params.id))[0];
	const me = 'zero';

	// 파트너 선택 api
	const selectPartner = (nickname: string) => {
		console.log(nickname);
	};
	return (
		<Layout>
			<section>
				<h1 className="mb-3">파트너를 구하고 있어요</h1>
				<article className="flex vertical border-1 p-6 mb-3 divide-y-1">
					<div>
						<h2 className="pb-3 mb-3 border-b-1">{data.title}</h2>
						<p className="min-h-[20vh]">{data.contents}</p>
						<p className="py-3 text-right font-semibold">
							{data.period}분 소요 / {addCommasToNumber(data.price)}원
						</p>
					</div>
					<div className="flex vertical">
						<h3 className="py-3">위치 찾기</h3>
						<map className="w-full h-96 mb-6">
							<NaverMap id={data.id} location={data.location} detail={false} />
						</map>
					</div>
					{data.author === me && (
						<div>
							<h3 className="py-3 flex items-center">파트너 선택</h3>
							<p className="box-border space-x-2">
								{data.partners.map((p, id) => (
									<button
										key={id}
										className="px-4 py-1 border-1 border-main rounded-full hover:bg-main hover:text-white transition"
										onClick={() => selectPartner(p)}
									>
										{p}
									</button>
								))}
							</p>
						</div>
					)}
				</article>
				<div className="flex justify-end space-x-3">
					{data.author !== me && (
						<button className="btn-primary">파트너로 지원하기</button>
					)}
					<button
						className="btn-secondary hover:bg-opacity-90 active:scale-95 transition"
						onClick={() => navigate('/')}
					>
						목록
					</button>
				</div>
			</section>
		</Layout>
	);
};

export default PostDetail;
