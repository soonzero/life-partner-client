import getLatLng from 'functions/getLatLng';
import PostCode from 'components/PostCode';
import Layout from 'components/Layout';
import bankList from 'data/bankList';
import { addCommasToNumber } from 'functions/common';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AccountInfo, NewPost } from 'types/types';
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WriteNewPost = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [info, setInfo] = useState<AccountInfo>();
	const [address, setAddress] = useState<string>(info?.address || '');
	const [dong, setDong] = useState<string>('');
	const [accountChangeMode, setAccountChangeMode] = useState<boolean>(false);
	const [locationChangeMode, setLocationChangeMode] = useState<boolean>(false);
	const { register, handleSubmit, watch, setValue } = useForm<NewPost>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<NewPost> = async (data: NewPost) => {
		if (isNaN(data.use_point)) data.use_point = 0;

		// 은행 선택 안 한 유저에게 은행 선택하라는 알림창
		if (data.post_bank === '--은행 선택--') {
			alert('은행을 선택해주세요.');
			return;
		}

		// 회원정보에 계좌 미등록했던 사람에게 계좌 정보 기본값으로 저장할 지 확인
		if (info?.bank === '') {
			if (window.confirm('계좌의 정보를 업데이트하시겠어요?')) {
				try {
					const response = await axios({
						method: 'PATCH',
						url: 'http://15.164.225.61/api/users/user-info/bank-account',
						headers: {
							authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
						data: {
							bank: data.post_bank,
							account: data.post_account,
							holder: data.post_holder,
						},
					});
				} catch (e) {
					console.log(e);
				}
			}
		}
		data.point_earned = data.price * 0.05;
		data.location = address;
		data.dong = dong;
		data.gu = data.location.split(' ')[1];

		// 게시글 등록 api
		try {
			const response = await axios({
				method: 'POST',
				url: 'http://15.164.225.61/api/articles',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
				data,
			});
			if (response.data.result) {
				alert('게시글이 등록되었어요!');
				navigate('/');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		if (name === 'location') {
			setLocationChangeMode((prev) => !prev);
			if (locationChangeMode) {
				setAddress((prev) => info?.address.split(',')[0] || '');
				setValue('detail_location', info?.detail_address || '');
			}
		} else if (name === 'account') {
			if (info?.bank !== '') {
				setAccountChangeMode((prev) => !prev);
				if (accountChangeMode) {
					setValue('post_bank', info?.bank || '--은행 선택--');
					setValue('post_account', info?.account || '');
					setValue('post_holder', info?.holder || '');
				}
			}
		}
	};

	const searchLocation = () => {
		setLocationChangeMode((prev) => true);
		setIsOpen((prev) => true);
	};

	const completeHandler = async (data: any) => {
		const [lng, lat] = await getLatLng(data.roadAddress);
		setAddress((prev) => `${data.roadAddress},${lat},${lng}`);
		setDong((prev) => (data.bname === '' ? data.bname1 : data.bname));
		setIsOpen(false);
	};

	const useAllPoint = () => {
		if (isNaN(watch('price'))) {
			alert('금액을 먼저 입력해주세요.');
		} else {
			setValue(
				'use_point',
				Math.min(...[watch('price'), info?.current_point || 0])
			);
		}
	};

	const getInfo = async () => {
		try {
			const result = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/users/user-info',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			setInfo((prev) => result.data);
			setAddress((prev) => result.data.address);
			setDong((prev) => result.data.dong);
			setValue('detail_location', result.data.detail_address);
			setValue(
				'post_bank',
				result.data.bank === '' ? '--은행 선택--' : result.data.bank
			);
			setAccountChangeMode((prev) => (result.data.bank === '' ? true : false));
			setValue('post_account', result.data.account);
			setValue('post_holder', result.data.holder);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<Layout>
			<section>
				<h1 className="mb-3">파트너 구하기</h1>
				{info && (
					<form
						className="vertical border-1 rounded-lg p-2 sm:p-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* 제목 + 내용 + 소요 시간 + 금액 + 현재 포인트 + 사용 포인트 */}
						<fieldset className="vertical py-3">
							{/* 제목 */}
							<input
								id="title"
								type="text"
								maxLength={15}
								placeholder="제목을 입력하세요. (공백 포함 최대 15자)"
								className="font-semibold text-sm border-b-1 px-2 py-1 mb-3 sm:text-base md:text-lg"
								{...register('title', {
									required: true,
								})}
							/>
							{/* 내용 */}
							<textarea
								id="contents"
								placeholder="요청 업무를 상세히 입력해주세요."
								className="border-1 p-2 h-[25vh] resize-none outline-none mb-3 text-xs sm:text-sm md:text-base"
								{...register('contents', {
									required: true,
								})}
							/>
							<div className="vertical space-y-1 lg:horizontal lg:space-y-0 lg:space-between">
								{/* 소요 시간 */}
								<div className="space-between lg:horizontal lg:space-x-3">
									<label htmlFor="period" className="post-label">
										소요 시간(분)
									</label>
									<input
										id="period"
										className="post-input"
										type="number"
										placeholder="5분 단위"
										min={10}
										max={180}
										step={5}
										{...register('period', {
											required: true,
											valueAsNumber: true,
										})}
									/>
								</div>
								{/* 금액 */}
								<div className="space-between lg:horizontal lg:space-x-3">
									<label htmlFor="price" className="post-label">
										금액(원)
									</label>
									<input
										id="price"
										className="post-input"
										type="number"
										placeholder="1,000원 단위"
										min={2000}
										max={30000}
										step={1000}
										{...register('price', {
											required: true,
											valueAsNumber: true,
										})}
									/>
								</div>
								{/* 현재 포인트 */}
								<div className="space-between lg:horizontal lg:space-x-3">
									<label className="post-label">현재 포인트</label>
									<input
										type="text"
										className="post-input"
										disabled
										value={`${addCommasToNumber(info.current_point)}점`}
									/>
								</div>
								{/* 사용 포인트 */}
								<div className="space-between lg:horizontal lg:space-x-3">
									<label htmlFor="use-point" className="post-label">
										사용 포인트
									</label>
									<input
										id="use-point"
										className="post-input"
										type="number"
										placeholder="10점 단위"
										min={0}
										step={10}
										max={Math.min(...[watch('price'), info.current_point])}
										{...register('use_point', {
											required: false,
											valueAsNumber: true,
										})}
									/>
									<button
										type="button"
										className="auth-button text-sm py-1 px-2 hidden"
										onClick={useAllPoint}
									>
										전액 사용
									</button>
								</div>
							</div>
						</fieldset>
						{/* 주소 */}
						<fieldset className="py-3 border-t-1">
							{/* 주소 라벨 + 주소 변경 버튼 */}
							<div className="space-between mb-3 lg:w-1/2">
								<h4 className="font-bold">주소</h4>
								<label htmlFor="change-location-mode" className="post-btn">
									{locationChangeMode ? '기존 주소 사용' : '다른 주소 사용'}
								</label>
							</div>
							{/* 기본 주소 + 주소 검색 버튼 + 상세 주소 */}
							<div className="space-between lg:w-1/2">
								<div className="flex w-full vertical space-y-3">
									{/* 기본 주소 + 주소 검색 버튼 */}
									<div className="vertical space-y-1 lg:horizontal lg:items-center">
										<input
											id="change-location-mode"
											name="location"
											type="checkbox"
											defaultChecked={locationChangeMode}
											onChange={changeMode}
											className="hidden"
										/>
										<label
											htmlFor="location"
											className="post-label mr-3 lg:shrink-0"
										>
											기본 주소
										</label>
										<input
											id="location"
											type="text"
											className="post-input w-full lg:grow lg:mr-3"
											disabled
											value={address.split(',')[0]}
										/>
										<button
											type="button"
											className="auth-button text-xs py-1 px-2 lg:shrink-0"
											onClick={searchLocation}
										>
											주소 검색
										</button>
									</div>
									{/* 상세 주소 */}
									<div className="vertical space-y-1 lg:horizontal lg:items-center">
										<label
											htmlFor="detail_location"
											className="post-label mr-3 lg:shrink-0"
										>
											상세 주소
										</label>
										<input
											id="detail_location"
											type="text"
											className="post-input w-full lg:grow"
											disabled={!locationChangeMode}
											{...register('detail_location', {
												required: true,
											})}
											defaultValue={info.detail_address}
										/>
									</div>
								</div>
							</div>
						</fieldset>
						{/* 계좌 */}
						<fieldset className="py-3 border-t-1">
							{/* 계좌 라벨 + 계좌 변경 버튼 */}
							<div className="space-between mb-3 lg:w-1/2">
								<h4 className="font-bold">환불 계좌</h4>
								<label htmlFor="change-account-mode" className="post-btn">
									{info.bank !== '' && accountChangeMode
										? '기존 계좌 사용'
										: info.bank !== '' && !accountChangeMode
										? '다른 계좌 사용'
										: '계좌를 입력하세요'}
								</label>
							</div>
							<div className="space-between">
								<div className="flex w-full vertical space-y-3">
									<div className="vertical space-y-1 lg:w-1/2">
										<input
											id="change-account-mode"
											name="account"
											type="checkbox"
											defaultChecked={accountChangeMode}
											onChange={changeMode}
											className="hidden"
										/>
										<select
											className="inline-block outline-none w-full border-1 p-1 mr-6 text-xs md:text-sm lg:text-base lg:w-1/3"
											disabled={!accountChangeMode}
											{...register('post_bank', {
												required: true,
											})}
											defaultValue={
												info.bank === '' ? '--은행 선택--' : info.bank
											}
										>
											<option>--은행 선택--</option>
											{bankList.map((b, i) => (
												<option key={i}>{b}</option>
											))}
										</select>
										<label htmlFor="post_holder" className="post-label mr-3">
											예금주
										</label>
										<input
											id="post_holder"
											type="text"
											className="post-input w-full lg:w-1/3"
											placeholder="예금주를 입력해주세요."
											disabled={!accountChangeMode}
											{...register('post_holder', {
												required: true,
											})}
											defaultValue={info.holder}
										/>
										<label htmlFor="post_account" className="post-label mr-3">
											계좌번호
										</label>
										<input
											id="post_account"
											type="text"
											className="post-input w-full lg:w-1/3"
											placeholder="사용할 계좌번호를 입력해주세요."
											disabled={!accountChangeMode}
											{...register('post_account', {
												required: true,
												pattern: /\d*$/,
											})}
											defaultValue={info.account}
										/>
									</div>
								</div>
							</div>
						</fieldset>
						<div className="flex w-full lg:justify-end">
							<button
								type="submit"
								className="btn-primary w-full lg:w-max lg:items-end"
							>
								등록
							</button>
						</div>
						<PostCode
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							completeHandler={completeHandler}
						/>
					</form>
				)}
			</section>
		</Layout>
	);
};

export default WriteNewPost;
