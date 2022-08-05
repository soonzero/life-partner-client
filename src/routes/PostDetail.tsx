import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from 'components/Layout';
import NaverMap from 'components/NaverMap';
import { addCommasToNumber } from 'functions/common';
import useInfoQuery from 'hooks/useInfoQuery';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
	const navigate = useNavigate();
	const params = useParams();
	const profile = useInfoQuery();

	// 게시글 상세 내역 조회
	const getDetail = async () => {
		const { data } = await axios({
			method: 'GET',
			url: `http://15.164.225.61/api/articles/detail/${params.id}`,
			headers: {
				authorization: sessionStorage.getItem('token')
					? `Bearer ${sessionStorage.getItem('token')}`
					: 'NOT user',
			},
		});
		// 게시글 상태가 waiting이 아닌 경우, 작성자만 확인할 수 있음
		if (
			data.article[0].status !== 'waiting' &&
			data.article[0].writer !== profile.data?.nickname
		) {
			alert('접근할 수 없는 게시글입니다.');
			navigate('/');
			return;
		}
		return data.article[0];
	};

	// 파트너 지원 api
	const applyForPartner = async () => {
		try {
			if (window.confirm('파트너로 지원하시겠습니까?')) {
				const {
					data: { partners },
				} = await axios({
					method: 'GET',
					url: `http://15.164.225.61/api/partners/${params.id}/list`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				if (partners.length >= 5) {
					alert('지원 가능한 파트너의 수를 초과했습니다.');
				} else {
					if (partners.includes(profile.data?.nickname)) {
						alert('이미 지원하셨습니다.');
					} else {
						const { status } = await axios({
							method: 'POST',
							url: `http://15.164.225.61/api/partners/${params.id}/post`,
							headers: {
								authorization: `Bearer ${sessionStorage.getItem('token')}`,
							},
						});
						if (status === 200) alert('파트너로 지원하셨습니다.');
					}
				}
			} else {
				return;
			}
		} catch (e) {
			console.log(e);
		}
	};

	// 게시글 삭제 api
	const deletePost = async () => {
		try {
			if (window.confirm('게시글을 삭제하시겠습니까?')) {
				const { data } = await axios({
					method: 'PATCH',
					url: `http://15.164.225.61/api/articles/${params.id}`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
					data: {
						status: 'deleted',
					},
				});
				if (data.result) {
					alert('게시글이 삭제되었습니다!');
					navigate('/');
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const { data } = useQuery(['post'], getDetail, {
		cacheTime: 0,
		enabled: !!profile.data?.nickname,
	});

	return (
		<Layout sideMenu pageTitle={data?.title || '상세 페이지'}>
			{data && (
				<section>
					<h1 className="text-2xl md:text-3xl">
						{data.status === 'waiting'
							? '파트너를 구하고 있어요'
							: data.status === 'matching'
							? '파트너가 정해졌어요'
							: data.status === 'complete'
							? '거래가 완료되었어요!'
							: '삭제된 글이에요'}
					</h1>
					<article className="flex vertical border-1 p-4 mb-3 divide-y-1 sm:p-6 dark:text-white">
						<div>
							<h2 className="pb-3 border-b-1 text-lg md:text-xl">
								{data.title}
							</h2>
							<p className="min-h-[20vh] text-sm sm:text-base">
								{data.contents}
							</p>
							<p className="py-3 text-right font-semibold text-sm sm:text-base">
								{data.period}분 소요 / {addCommasToNumber(data.price)}원
							</p>
						</div>
						<div className="flex vertical">
							<h3 className="py-3">위치</h3>
							<map className="w-full h-48 sm:h-72 md:h-96">
								<NaverMap
									id={data.id}
									location={data.location}
									detail={false}
								/>
							</map>
						</div>
					</article>
					<div className="flex justify-end space-x-3">
						{data.writer !== profile.data?.nickname ? (
							<button className="btn-primary" onClick={applyForPartner}>
								파트너로 지원하기
							</button>
						) : (
							(data.status == 'waiting' || data.status == 'matching') && (
								<button className="btn-primary" onClick={deletePost}>
									삭제
								</button>
							)
						)}
						<button
							className="btn-secondary hover:bg-opacity-90 active:scale-95 transition"
							onClick={() => navigate('/')}
						>
							목록
						</button>
					</div>
				</section>
			)}
		</Layout>
	);
};

export default PostDetail;
