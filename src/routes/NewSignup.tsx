import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpForm } from 'types/types';
import bankList from 'data/bankList';
import { useState, useEffect } from 'react';
import getLatLng from 'functions/getLatLng';
import classNames from 'classnames';
import Layout from 'components/Layout';
import PostCode from 'components/PostCode';
import { leaveOnlyNumber } from 'functions/dashes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewSignup = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpForm>({
		mode: 'onChange',
	});
	const [address, setAddress] = useState<string>('');
	const [gu, setGu] = useState<string>('');
	const [dong, setDong] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
		if (address.length > 0) {
			if (
				(data.bank === '--은행 선택--' &&
					(data.holder.length > 0 || data.account.length > 0)) ||
				(data.bank !== '--은행 선택--' &&
					(data.holder.length === 0 || data.account.length === 0))
			) {
				alert('선택 항목은 모두 입력되거나 모두 비워져있어야 합니다.');
			} else {
				try {
					const result = await axios({
						method: 'POST',
						url: 'http://15.164.225.61/api/users/signup',
						data: {
							nickname: data.nickname,
							password: data.password,
							phone: leaveOnlyNumber(data.phone),
							address: address,
							detail_address: data.detail_address,
							gu: gu,
							dong: dong,
							bank: data.bank === '--은행 선택--' ? '' : data.bank,
							account: data.account,
							holder: data.holder,
						},
					});
					if (result) {
						navigate('/login');
					}
				} catch (e) {
					console.log(e);
				}
			}
		} else {
			alert('주소를 입력해주세요');
		}
	};

	const completeHandler = async (data: any) => {
		const [lng, lat] = await getLatLng(data.roadAddress);
		setAddress((prev) => `${data.roadAddress},${lat},${lng}`);
		setGu((prev) => data.sigungu);
		setDong((prev) => (data.bname === '' ? data.bname1 : data.bname));
		setIsOpen(false);
	};

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
			<section className="max-w-lg">
				<h1 className="mb-6">회원가입</h1>
				<form
					className="vertical bg-white rounded-lg border-1 border-gray-200 p-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<fieldset className="vertical mb-6">
						<legend className="text-xl font-semibold mb-6">필수 항목</legend>
						<label htmlFor="nickname" className="auth-label mandatory">
							닉네임
						</label>
						<input
							id="nickname"
							type="text"
							placeholder="한글/숫자를 이용하여 3-8자로 입력해주세요."
							className="auth-input"
							{...register('nickname', {
								required: true,
								maxLength: 8,
								minLength: 3,
								pattern: /^[가-힣0-9]*$/,
							})}
						/>
						<span
							className={classNames('guide-msg', {
								error: errors.nickname,
							})}
						>
							{errors.nickname && '한글/숫자를 이용하여 3-8자로 입력해주세요.'}
						</span>
						<label htmlFor="password" className="auth-label mandatory">
							비밀번호
						</label>
						<input
							id="password"
							type="password"
							placeholder="한글을 제외하고 8-12자로 입력해주세요."
							className="auth-input"
							{...register('password', {
								required: true,
								maxLength: 12,
								minLength: 8,
								pattern: /^[^ㄱ-ㅎ가-힣]*$/,
							})}
						/>
						<span
							className={classNames('guide-msg', {
								error: errors.password,
							})}
						>
							{errors.password &&
								(errors.password.type === 'pattern'
									? '비밀번호에 한글이 포함되어 있어요.'
									: '비밀번호는 8-12자로 입력해주세요.')}
						</span>
						<label htmlFor="passwordConfirm" className="auth-label mandatory">
							비밀번호 확인
						</label>
						<input
							id="passwordConfirm"
							type="password"
							placeholder="비밀번호를 한 번 더 입력해주세요."
							className="auth-input"
							{...register('passwordConfirm', {
								required: true,
								maxLength: 12,
								minLength: 8,
								validate: (value: string) => value === watch('password'),
							})}
						/>
						<span
							className={classNames('guide-msg', {
								error: errors.passwordConfirm,
							})}
						>
							{errors.passwordConfirm && '비밀번호를 다시 한 번 확인해주세요.'}
						</span>
						<label htmlFor="phone" className="auth-label mandatory">
							휴대폰 번호
						</label>
						<input
							id="phone"
							type="text"
							className="auth-input"
							placeholder="휴대폰 번호를 숫자만 입력해주세요."
							{...register('phone', {
								required: true,
								minLength: 10,
								maxLength: 11,
								pattern: /^[0-9]*$/,
							})}
						/>
						<span
							className={classNames('guide-msg', {
								error: errors.phone,
							})}
						>
							{errors.phone &&
								(errors.phone.type === 'pattern'
									? '숫자만 입력해주세요.'
									: '휴대폰 번호는 10-11자리로 입력해주세요.')}
						</span>
						<label className="auth-label mandatory">기본 주소</label>
						<div className="flex center mb-3">
							<input
								id="address"
								type="text"
								className="auth-input mb-0 mr-3 grow"
								required
								disabled
								value={address.split(',')[0]}
							/>
							<button
								type="button"
								className="auth-button text-sm py-1 px-2"
								onClick={() => setIsOpen(true)}
							>
								주소 검색
							</button>
						</div>
						<label className="auth-label">상세 주소</label>
						<input
							id="detailAddress"
							type="text"
							placeholder="상세 주소가 필요한 경우 입력해주세요."
							className="auth-input"
							{...register('detail_address', {
								required: false,
							})}
						/>
					</fieldset>
					<fieldset className="vertical mb-6">
						<legend className="text-xl font-semibold mb-6">선택 항목</legend>
						<div className="flex space-x-5 mb-3">
							<div className="vertical justify-start flex-1">
								<label className="auth-label">은행</label>
								<select
									id="bank"
									className="outline-none h-full border-1 text-center"
									{...register('bank', {
										required: false,
									})}
								>
									<option>--은행 선택--</option>
									{bankList.map((bank, index) => (
										<option key={index}>{bank}</option>
									))}
								</select>
							</div>
							<div className="vertical flex-1">
								<label htmlFor="holder" className="auth-label">
									예금주
								</label>
								<input
									id="holder"
									type="text"
									placeholder="예금주를 입력해주세요."
									className="auth-input"
									{...register('holder', {
										required: false,
									})}
								/>
							</div>
						</div>
						<label htmlFor="account" className="auth-label">
							계좌번호
						</label>
						<input
							id="account"
							type="text"
							placeholder="계좌번호는 - 없이 숫자만 입력해주세요."
							className="auth-input"
							{...register('account', {
								required: false,
								pattern: /\d*$/,
							})}
						/>
					</fieldset>
					<button
						type="submit"
						className={classNames({
							'btn-primary':
								!errors.nickname &&
								!errors.password &&
								!errors.passwordConfirm &&
								!errors.phone &&
								address.length > 0,
							'btn-secondary disabled':
								errors.nickname ||
								errors.password ||
								errors.passwordConfirm ||
								errors.phone ||
								address.split(',')[0].length === 0,
						})}
					>
						회원가입
					</button>
				</form>
			</section>
			<PostCode
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				completeHandler={completeHandler}
			/>
		</Layout>
	);
};

export default NewSignup;
