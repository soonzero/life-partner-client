import Header from 'components/Header';
import bankList from 'data/bankList';
import useInputs from 'hooks/useInputs';
import { FormEvent, useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import ReactModal from 'react-modal';

const initialState = {
	nickname: '',
	password: '',
	passwordConfirm: '',
	phone: '',
	detailAddress: '',
	bank: '',
	account: '',
	holder: '',
};

const Signup = () => {
	const [
		{
			nickname,
			password,
			passwordConfirm,
			phone,
			detailAddress,
			bank,
			account,
			holder,
		},
		onChange,
	] = useInputs(initialState);
	const [address, setAddress] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(
			nickname,
			password,
			phone,
			address,
			detailAddress,
			bank,
			account,
			holder
		);
		// 회원가입 api 연동
	};

	const completeHandler = (data: any) => {
		setAddress(data.roadAddress);
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
		<>
			<Header />
			<main>
				<section className="max-w-lg">
					<h1 className="mb-6">회원가입</h1>
					<form
						className="vertical bg-white rounded-lg border-1 border-gray-200 p-8"
						onSubmit={onSubmit}
					>
						<fieldset className="vertical mb-6">
							<legend className="text-xl font-semibold mb-6">필수 항목</legend>
							<label htmlFor="nickname" className="auth-label mandatory">
								닉네임
							</label>
							<input
								id="nickname"
								type="text"
								maxLength={8}
								minLength={3}
								placeholder="닉네임을 입력해주세요."
								className="auth-input"
								required
								value={nickname}
								onChange={onChange}
							/>
							<label htmlFor="password" className="auth-label mandatory">
								비밀번호
							</label>
							<input
								id="password"
								type="password"
								maxLength={12}
								minLength={8}
								placeholder="비밀번호를 입력해주세요."
								className="auth-input"
								required
								value={password}
								onChange={onChange}
							/>
							<label htmlFor="passwordConfirm" className="auth-label mandatory">
								비밀번호 확인
							</label>
							<input
								id="passwordConfirm"
								type="password"
								maxLength={12}
								minLength={8}
								placeholder="비밀번호를 한 번 더 입력해주세요."
								className="auth-input"
								required
								value={passwordConfirm}
								onChange={onChange}
							/>
							<label htmlFor="phone" className="auth-label mandatory">
								휴대폰 번호
							</label>
							<input
								id="phone"
								type="text"
								maxLength={11}
								className="auth-input"
								placeholder="휴대폰 번호를 입력해주세요."
								pattern="\d*"
								required
								value={phone}
								onChange={onChange}
							/>
							<label className="auth-label mandatory">기본 주소</label>
							<div className="flex center mb-3">
								<input
									id="address"
									type="text"
									className="auth-input mb-0 mr-3 grow"
									required
									disabled
									value={address}
									onChange={onChange}
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
								className="auth-input"
								value={detailAddress}
								onChange={onChange}
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
										value={bank}
										onChange={onChange}
									>
										<option>--선택하세요--</option>
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
										className="auth-input"
										value={holder}
										onChange={onChange}
									/>
								</div>
							</div>
							<label htmlFor="account" className="auth-label">
								계좌번호
							</label>
							<input
								id="account"
								type="text"
								className="auth-input"
								value={account}
								onChange={onChange}
							/>
						</fieldset>
						<button type="submit" className="btn-primary">
							회원가입
						</button>
					</form>
				</section>
				<ReactModal
					isOpen={isOpen}
					style={{
						overlay: {
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							zIndex: '10',
						},
						content: {
							margin: 'auto',
							width: '50%',
							height: '80%',
						},
					}}
				>
					<DaumPostcode
						onComplete={completeHandler}
						style={{ height: '100%' }}
					/>
				</ReactModal>
			</main>
		</>
	);
};

export default Signup;
