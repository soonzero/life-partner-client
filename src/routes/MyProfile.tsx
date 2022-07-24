import Sidebar from 'components/SideBar';
import { ReactComponent as Profile } from 'static/icons/user.svg';
import { addCommasToNumber } from 'functions/common';
import Layout, { MyPageLayout } from 'components/Layout';
import { addDashes } from 'functions/dashes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AccountInfo } from 'types/types';
import { useEffect, useState } from 'react';

const MyProfile = () => {
	const [data, setData] = useState<AccountInfo | null>(null);

	const getInfo = async () => {
		try {
			if (window.sessionStorage.getItem('token')) {
				const response = await axios({
					method: 'GET',
					url: 'http://15.164.225.61/api/users/user-info',
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
				setData((prev) => response.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="내 정보" />
				{data && (
					<MyPageLayout>
						<h1 className="mb-6">내 정보</h1>
						<div className="flex items-center">
							<figure className="flex center bg-slate-200 w-40 h-40 rounded-full">
								<Profile className="w-16 fill-white" />
							</figure>
							<table className="grow border-separate border-spacing-x-3 border-spacing-y-1">
								<tbody>
									<tr>
										<th className="thead">닉네임</th>
										<td className="tbody">{data.nickname}</td>
									</tr>
									<tr>
										<th className="thead">휴대폰 번호</th>
										<td className="tbody">{addDashes(data.phone)}</td>
									</tr>
									<tr>
										<th className="thead">주소</th>
										<td className="tbody">{`${data.address.split(',')[0]}, ${
											data.detail_address
										}`}</td>
									</tr>
									<tr>
										<th className="thead">은행명</th>
										<td className="tbody">
											{data.bank.length > 0 ? (
												data.bank
											) : (
												<Link to="/mypage/change/info">미등록</Link>
											)}
										</td>
									</tr>
									<tr>
										<th className="thead">계좌번호</th>
										<td className="tbody">
											{data.account.length > 0 ? (
												data.account
											) : (
												<Link to="/mypage/change/info">미등록</Link>
											)}
										</td>
									</tr>
									<tr>
										<th className="thead">예금주</th>
										<td className="tbody">
											{data.holder.length > 0 ? (
												data.holder
											) : (
												<Link to="/mypage/change/info">미등록</Link>
											)}
										</td>
									</tr>
									<tr>
										<th className="thead">사용 가능 포인트</th>
										<td className="tbody">
											{addCommasToNumber(data.current_point)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</MyPageLayout>
				)}
			</section>
		</Layout>
	);
};

export default MyProfile;
