import Layout, { MyPageLayout } from 'components/Layout';
import SideBar from 'components/SideBar';
import { FormEvent, useState, useEffect } from 'react';
import { leaveOnlyNumber } from 'functions/dashes';
import getLatLng from 'functions/getLatLng';
import PostCode from 'components/PostCode';
import bankList from 'data/bankList';
import classNames from 'classnames';
import axios from 'axios';
import { AccountInfo } from 'types/types';
import { useNavigate } from 'react-router-dom';

const ChangeInfo = () => {
	const navigate = useNavigate();
	const [mode, setMode] = useState<string>('phone');
	const [newPhone, setNewPhone] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [data, setData] = useState<AccountInfo | null>(null);
	const [address, setAddress] = useState<string>('');
	const [detailAddress, setDetailAddress] = useState<string>('');
	const [bank, setBank] = useState<string>('');
	const [holder, setHolder] = useState<string>('');
	const [account, setAccount] = useState<string>('');
	const [dong, setDong] = useState<string>('');

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mode === 'phone') {
			if (leaveOnlyNumber(newPhone).length === 11) {
				try {
					const result = await axios({
						method: 'PATCH',
						url: 'http://15.164.225.61/api/users/user-info/phone',
						headers: {
							authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
						data: {
							phone: leaveOnlyNumber(newPhone),
						},
					});
					if (result.status === 200) {
						alert('휴대폰 번호가 변경되었습니다.');
						navigate('/mypage/profile');
					}
				} catch (e) {
					console.log(e);
				}
			} else {
				alert('휴대폰 번호를 다시 한 번 확인해주세요.');
			}
		} else if (mode === 'address') {
			if (address.length > 0) {
				if (data?.address.split(',')[0] !== address.split(',')[0]) {
					try {
						const result = await axios({
							method: 'PATCH',
							url: 'http://15.164.225.61/api/users/user-info/address',
							headers: {
								authorization: `Bearer ${sessionStorage.getItem('token')}`,
							},
							data: {
								address,
								detail_address: detailAddress,
								dong: dong,
							},
						});
						if (result.status === 200) {
							alert('주소가 변경되었습니다.');
							navigate('/mypage/profile');
						}
					} catch (e) {
						console.log(e);
					}
				} else {
					if (data?.detail_address === detailAddress) {
						alert(
							'변경된 주소가 이전 주소와 같습니다. 다시 한 번 확인해주세요.'
						);
					} else {
						try {
							const result = await axios({
								method: 'PATCH',
								url: 'http://15.164.225.61/api/users/user-info/address',
								headers: {
									authorization: `Bearer ${sessionStorage.getItem('token')}`,
								},
								data: {
									address,
									detail_address: detailAddress,
									dong: dong,
								},
							});
							if (result.status === 200) {
								alert('주소가 변경되었습니다.');
								navigate('/mypage/profile');
							}
						} catch (e) {
							console.log(e);
						}
					}
				}
			} else {
				alert('주소를 입력해주세요.');
			}
		} else {
			if (
				bank !== '--은행 선택--' &&
				bank.length > 0 &&
				account.length > 0 &&
				holder.length > 0
			) {
				if (
					data?.bank !== bank ||
					data?.account !== account ||
					data?.holder !== holder
				) {
					const accountOnlyWithNumber = leaveOnlyNumber(account);
					try {
						const result = await axios({
							method: 'PATCH',
							url: 'http://15.164.225.61/api/users/user-info/bank-account',
							headers: {
								authorization: `Bearer ${sessionStorage.getItem('token')}`,
							},
							data: {
								bank,
								account: accountOnlyWithNumber,
								holder,
							},
						});
						if (result.status === 200) {
							alert('계좌 정보가 변경되었습니다.');
							navigate('/mypage/profile');
						}
					} catch (e) {
						console.log(e);
					}
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
		setAddress((prev) => `${data.roadAddress},${lat},${lng}`);
		setDong((prev) => (data.bname === '' ? data.bname1 : data.bname));
		setIsOpen(false);
	};

	const getInfo = async () => {
		try {
			const { data } = await axios({
				method: 'GET',
				url: 'http://15.164.225.61/api/users/user-info',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			setData((prev) => data);
			setAddress((prev) => data.address);
			setDetailAddress((prev) => data.detail_address);
			setBank((prev) => data.bank);
			setAccount((prev) => data.account);
			setHolder((prev) => data.holder);
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
		<Layout
			pageTitle={
				mode === 'phone'
					? '휴대폰 번호 변경'
					: mode === 'address'
					? '주소 변경'
					: '계좌 변경'
			}
		>
			<section className="mypage-layout">
				<SideBar currentMenu="회원정보 수정" />
				<MyPageLayout>
					<h1>회원정보 수정</h1>
					<nav className="text-sm md:text-base  text-gray-300">
						<ul className="flex border-b-1">
							{[
								['휴대폰 번호', 'phone'],
								['주소', 'address'],
								['계좌', 'account'],
							].map(([title, name], idx) => (
								<li
									key={idx}
									className={classNames('px-3 py-2 cursor-pointer transition', {
										'font-bold text-main': mode === name,
									})}
									onClick={() => setMode((prev) => name)}
								>
									{title}
								</li>
							))}
						</ul>
					</nav>
					{mode === 'phone' && (
						<form name="phone" className="mypage-form" onSubmit={submitHandler}>
							<label htmlFor="phone" className="mypage-label">
								휴대폰 번호
							</label>
							<input
								id="phone"
								type="text"
								className="auth-input"
								placeholder="사용할 휴대폰 번호를 숫자만 입력해주세요"
								maxLength={11}
								onChange={(e) => setNewPhone((prev) => e.target.value)}
							/>
							<button
								className="btn-primary w-full md:w-max text-xs md:text-base"
								type="submit"
							>
								휴대폰 번호 변경
							</button>
						</form>
					)}
					{mode === 'address' && (
						<form
							name="address"
							className="mypage-form"
							onSubmit={submitHandler}
						>
							<div className="grow vertical space-y-2">
								<fieldset className="space-y-2">
									<label
										htmlFor="new-detail-address"
										className="mypage-label min-w-max"
									>
										주소
									</label>
									<div className="vertical space-y-2 w-full">
										<div className="flex items-center space-x-2">
											<input
												type="text"
												className="auth-input"
												value={address.split(',')[0]}
												disabled
											/>
											<button
												type="button"
												className="auth-button text-xs md:text-sm py-1 px-2"
												onClick={() => setIsOpen(true)}
											>
												주소 검색
											</button>
										</div>
										<input
											id="new-detail-address"
											type="text"
											className="auth-input"
											value={detailAddress}
											onChange={(e) =>
												setDetailAddress((prev) => e.target.value)
											}
										/>
									</div>
								</fieldset>
							</div>
							<button
								className="btn-primary w-full md:w-max text-xs md:text-base"
								type="submit"
							>
								주소 변경
							</button>
						</form>
					)}
					{mode === 'account' && (
						<form className="mypage-form" onSubmit={submitHandler}>
							<fieldset className="horizontal items-center space-x-3">
								<label className="min-w-[3rem] mypage-label">은행</label>
								<select
									className="auth-input text-center"
									value={bank === '' ? '--은행 선택--' : bank}
									onChange={(e) => setBank((prev) => e.target.value)}
								>
									<option>--은행 선택--</option>
									{bankList.map((b, id) => (
										<option key={id}>{b}</option>
									))}
								</select>
							</fieldset>
							<fieldset className="horizontal items-center space-x-3">
								<label htmlFor="holder" className="min-w-[3rem] mypage-label">
									예금주
								</label>
								<input
									id="holder"
									type="text"
									value={holder}
									className="auth-input"
									placeholder="예금주를 입력해주세요."
									onChange={(e) => setHolder((prev) => e.target.value)}
								/>
							</fieldset>
							<fieldset className="horizontal items-center space-x-3">
								<label htmlFor="account" className="min-w-[3rem] mypage-label">
									계좌
								</label>
								<input
									id="account"
									type="text"
									value={account}
									className="auth-input"
									placeholder="계좌번호를 입력해주세요."
									onChange={(e) => setAccount((prev) => e.target.value)}
								/>
							</fieldset>
							<div className="flex w-full md:justify-end">
								<button
									className="btn-primary w-full md:w-max text-xs md:text-base"
									type="submit"
								>
									계좌 변경
								</button>
							</div>
						</form>
					)}
				</MyPageLayout>
			</section>
			<PostCode
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				completeHandler={completeHandler}
			/>
		</Layout>
	);
};

export default ChangeInfo;
