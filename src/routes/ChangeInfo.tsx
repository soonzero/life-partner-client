import Layout, { MyPageLayout } from 'components/Layout';
import SideBar from 'components/SideBar';
import dummyData from 'data/dummyData';
import { FormEvent, useState, useEffect } from 'react';
import addDashes from 'functions/addDashes';
import getLatLng from 'functions/getLatLng';
import PostCode from 'components/PostCode';
import bankList from 'data/bankList';
import classNames from 'classnames';

const ChangeInfo = () => {
	const user = dummyData.user;
	const [mode, setMode] = useState<string>('phone');
	const [newPhone, setNewPhone] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [address, setAddress] = useState<string>(user.address.split(',')[0]);
	const [detailAddress, setDetailAddress] = useState<string>(
		user.detail_address
	);
	const [bank, setBank] = useState<string>(
		user.bank == '' ? '--은행 선택--' : user.bank
	);
	const [holder, setHolder] = useState<string>('');
	const [account, setAccount] = useState<string>('');

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === 'phone') {
			if (newPhone.length === 11) {
				const dashedNumber = addDashes(newPhone);
				console.log(dashedNumber);
				// 휴대폰 번호 변경 api 연동
			} else {
				alert('휴대폰 번호를 다시 한 번 확인해주세요.');
			}
		} else if (mode === 'address') {
			if (address.length > 0) {
				if (user.address.split(',')[0] !== address.split(',')[0]) {
					console.log(address);
					console.log(detailAddress);
					// 주소 변경 api 연동
				} else {
					if (user.detail_address === detailAddress) {
						alert(
							'변경된 주소가 이전 주소와 같습니다. 다시 한 번 확인해주세요.'
						);
					}
					// 주소 변경 api 연동
				}
			} else {
				alert('주소를 입력해주세요.');
			}
		} else {
			if (bank.length > 0 && account.length > 0 && holder.length > 0) {
				if (
					user.bank !== bank ||
					user.account !== account ||
					user.holder !== holder
				) {
					// 계좌 변경 api 연동
				} else {
					alert('변경할 계좌의 정보가 이전 계좌의 정보와 같습니다.');
				}
			} else {
				alert('계좌를 입력해주세요.');
			}
		}
	};

	const completeHandler = async (data: any) => {
		const [lng, lat] = await getLatLng(data.roadAddress);
		setAddress(
			(prev) =>
				`${data.roadAddress},${lat},${lng},${
					data.bname === '' ? data.bname1 : data.bname
				}`
		);
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
			<section className="flex space-x-6">
				<SideBar currentMenu="회원정보 수정" />
				<MyPageLayout>
					<h1 className="mb-1">회원정보 수정</h1>
					<nav className="font-bold text-gray-300">
						<ul className="flex border-b-1">
							<li
								className={classNames('px-3 py-2 cursor-pointer transition', {
									'text-main': mode === 'phone',
								})}
								onClick={() => setMode((prev) => 'phone')}
							>
								휴대폰 번호
							</li>
							<li
								className={classNames('px-3 py-2 cursor-pointer transition', {
									'text-main': mode === 'address',
								})}
								onClick={() => setMode((prev) => 'address')}
							>
								주소
							</li>
							<li
								className={classNames('px-3 py-2 cursor-pointer transition', {
									'text-main': mode === 'account',
								})}
								onClick={() => setMode((prev) => 'account')}
							>
								계좌
							</li>
						</ul>
					</nav>
					{mode === 'phone' && (
						<form
							name="phone"
							className="flex space-x-6 items-center py-3"
							onSubmit={submitHandler}
						>
							<label htmlFor="phone" className="mx-3 font-medium">
								휴대폰 번호
							</label>
							<input
								id="phone"
								type="text"
								className="p-1 border-1 grow"
								placeholder="사용할 휴대폰 번호를 숫자만 입력해주세요"
								maxLength={11}
								onChange={(e) => setNewPhone((prev) => e.target.value)}
							/>
							<button className="btn-primary" type="submit">
								변경
							</button>
						</form>
					)}
					{mode === 'address' && (
						<form
							name="address"
							className="flex space-x-6 py-3"
							onSubmit={submitHandler}
						>
							<div className="grow vertical space-y-2">
								<fieldset className="flex space-x-2 items-center">
									<label
										htmlFor="new-detail-address"
										className="mx-3 font-medium min-w-max"
									>
										주소
									</label>
									<div className="vertical space-y-2 w-full">
										<div className="flex items-center space-x-2">
											<input
												type="text"
												className="p-1 border-1 grow"
												value={address.split(',')[0]}
												disabled
											/>
											<button
												type="button"
												className="auth-button text-sm py-1 px-2"
												onClick={() => setIsOpen(true)}
											>
												주소 검색
											</button>
										</div>
										<input
											id="new-detail-address"
											type="text"
											placeholder=""
											className="p-1 border-1 grow"
											value={detailAddress}
											onChange={(e) =>
												setDetailAddress((prev) => e.target.value)
											}
										/>
									</div>
								</fieldset>
							</div>
							<button className="btn-primary" type="submit">
								변경
							</button>
						</form>
					)}
					{mode === 'account' && (
						<form className="py-3" onSubmit={submitHandler}>
							<div className="flex space-x-6">
								<div className="vertical space-y-2 w-full">
									<fieldset className="flex items-center space-x-3">
										<label className="mx-3 font-medium min-w-max">은행</label>
										<select
											className="grow outline-none text-center border-1 p-1"
											value={bank}
											onChange={(e) => setBank((prev) => e.target.value)}
										>
											<option>--은행 선택--</option>
											{bankList.map((b, id) => (
												<option key={id}>{b}</option>
											))}
										</select>
										<label className="mx-3 font-medium min-w-max">예금주</label>
										<input
											type="text"
											value={holder}
											className="grow p-1 border-1"
											placeholder="예금주를 입력하세요."
											onChange={(e) => setHolder((prev) => e.target.value)}
										/>
									</fieldset>
									<fieldset className="flex items-center space-x-3">
										<label className="mx-3 font-medium min-w-max">계좌</label>
										<input
											type="text"
											value={account}
											className="grow p-1 border-1"
											placeholder="계좌번호를 입력하세요."
											onChange={(e) => setAccount((prev) => e.target.value)}
										/>
									</fieldset>
								</div>
								<button className="btn-primary min-w-max" type="submit">
									변경
								</button>
							</div>
						</form>
					)}
				</MyPageLayout>
			</section>
			<PostCode isOpen={isOpen} completeHandler={completeHandler} />
		</Layout>
	);
};

export default ChangeInfo;
