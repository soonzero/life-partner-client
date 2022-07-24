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
	const [data, setData] = useState<AccountInfo>();
	const [address, setAddress] = useState<string>(data?.address || '');
	const [dong, setDong] = useState<string>('');
	const [accountChangeMode, setAccountChangeMode] = useState<boolean>(false);
	const [locationChangeMode, setLocationChangeMode] = useState<boolean>(false);
	const { register, handleSubmit, watch, setValue } = useForm<NewPost>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<NewPost> = async (data: NewPost) => {
		if (isNaN(data.use_point)) data.use_point = 0;
		data.point_earned = data.price * 0.05;
		data.location = address;
		data.dong = dong;
		data.gu = data.location.split(' ')[1];
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
				setAddress((prev) => data?.address.split(',')[0] || '');
				setValue('detail_location', data?.detail_address || '');
			}
		} else if (name === 'account') {
			if (data?.bank !== '--은행 선택--') {
				setAccountChangeMode((prev) => !prev);
				if (!accountChangeMode) {
					setValue('post_bank', data?.bank || '--은행 선택--');
					setValue('post_account', data?.account || '');
					setValue('post_holder', data?.holder || '');
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
				Math.min(...[watch('price'), data?.current_point || 0])
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
			console.log(result.data);
			setData((prev) => result.data);
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
				{data && (
					<form
						className="border-1 rounded-lg p-8"
						onSubmit={handleSubmit(onSubmit)}
					>
						<fieldset className="vertical py-3">
							<input
								id="title"
								type="text"
								maxLength={15}
								placeholder="제목을 입력하세요. (공백 포함 최대 15자)"
								className="font-semibold text-xl border-b-1 px-2 py-1 mb-3"
								{...register('title', {
									required: true,
								})}
							/>
							<textarea
								id="contents"
								placeholder="요청 업무를 상세히 입력해주세요."
								className="border-1 p-2 h-[25vh] resize-none outline-none mb-3"
								{...register('contents', {
									required: true,
								})}
							/>
							<div className="flex items-center space-x-6">
								<div className="space-x-3">
									<label htmlFor="period" className="post-label">
										소요 시간(분)
									</label>
									<input
										id="period"
										className="p-1 border-1 w-32"
										type="number"
										placeholder="10분 단위"
										min={10}
										max={180}
										step={5}
										{...register('period', {
											required: true,
											valueAsNumber: true,
										})}
									/>
								</div>
								<div className="space-x-3">
									<label htmlFor="price" className="post-label">
										금액(원)
									</label>
									<input
										id="price"
										className="p-1 border-1 w-32"
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
								<label className="post-label">현재 포인트</label>
								<input
									type="text"
									className="w-20 p-1 border-1"
									disabled
									value={`${addCommasToNumber(data.current_point)}점`}
								/>
								<div className="space-x-3">
									<label htmlFor="use-point" className="post-label">
										사용 포인트
									</label>
									<input
										id="use-point"
										className="border-1 p-1 w-32"
										type="number"
										placeholder="10점 단위"
										min={0}
										step={10}
										max={Math.min(...[watch('price'), data.current_point])}
										{...register('use_point', {
											required: false,
											valueAsNumber: true,
										})}
									/>
									<button
										type="button"
										className="auth-button text-sm py-1 px-2"
										onClick={useAllPoint}
									>
										전액 사용
									</button>
								</div>
							</div>
						</fieldset>
						<fieldset className="py-3">
							<div className="flex items-center mb-3 space-x-6">
								<h3>주소</h3>
								<label htmlFor="change-location-mode" className="post-btn">
									{locationChangeMode
										? '기존 주소 사용하기'
										: '다른 주소 사용하기'}
								</label>
							</div>
							<div className="flex items-center space-x-6">
								<div className="flex w-1/2 vertical space-y-1">
									<div className="flex items-center">
										<input
											id="change-location-mode"
											name="location"
											type="checkbox"
											defaultChecked={locationChangeMode}
											onChange={changeMode}
											className="hidden"
										/>
										<label htmlFor="location" className="post-label mr-3">
											기본 주소
										</label>
										<input
											id="location"
											type="text"
											className="grow border-1 p-1 mr-1"
											disabled
											value={data.address.split(',')[0]}
										/>
										<button
											type="button"
											className="auth-button text-sm py-1 px-2"
											onClick={searchLocation}
										>
											주소 검색
										</button>
									</div>
									<div className="flex items-center">
										<label
											htmlFor="detail_location"
											className="post-label mr-3"
										>
											상세 주소
										</label>
										<input
											id="detail_location"
											type="text"
											className="grow border-1 p-1"
											disabled={!locationChangeMode}
											{...register('detail_location', {
												required: true,
											})}
											defaultValue={data.detail_address}
										/>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset className="py-3">
							<div className="flex items-center space-x-6 mb-3">
								<h3>환불 계좌</h3>
								<label htmlFor="change-account-mode" className="post-btn">
									{data.bank !== '--은행 선택--' && accountChangeMode
										? '기존 계좌 사용하기'
										: data.bank !== '--은행 선택--' && !accountChangeMode
										? '다른 계좌 사용하기'
										: '사용할 계좌 입력'}
								</label>
							</div>
							<div className="flex items-center space-x-6">
								<div className="w-1/2">
									<div className="flex items-center mb-1">
										<input
											id="change-account-mode"
											name="account"
											type="checkbox"
											defaultChecked={accountChangeMode}
											onChange={changeMode}
											className="hidden"
										/>
										<select
											className="inline-block outline-none min-w-[6rem] w-1/9 border-1 p-1 mr-6"
											disabled={!accountChangeMode}
											{...register('post_bank', {
												required: true,
											})}
											defaultValue={
												data.bank === '' ? '--은행 선택--' : data.bank
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
											className="grow border-1 p-1 px-2"
											placeholder="예금주를 입력해주세요."
											disabled={!accountChangeMode}
											{...register('post_holder', {
												required: true,
											})}
											defaultValue={data.holder}
										/>
									</div>
									<div className="flex items-center">
										<label htmlFor="post_account" className="post-label mr-3">
											계좌번호
										</label>
										<input
											id="post_account"
											type="text"
											className="grow border-1 p-1 px-2"
											placeholder="사용할 계좌번호를 입력해주세요."
											disabled={!accountChangeMode}
											{...register('post_account', {
												required: true,
												pattern: /\d*$/,
											})}
											defaultValue={data.account}
										/>
									</div>
								</div>
							</div>
						</fieldset>
						<div className="flex justify-end">
							<button type="submit" className="btn-primary">
								등록
							</button>
						</div>
						<PostCode isOpen={isOpen} completeHandler={completeHandler} />
					</form>
				)}
			</section>
		</Layout>
	);
};

export default WriteNewPost;
