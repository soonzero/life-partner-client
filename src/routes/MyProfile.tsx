import Sidebar from 'components/SideBar';
import { ReactComponent as Profile } from 'static/icons/user.svg';
import dummyData from 'data/dummyData';
import { addCommasToNumber } from 'functions/common';
import Layout, { MyPageLayout } from 'components/Layout';
import addDashes from 'functions/addDashes';
import { Link } from 'react-router-dom';

const MyProfile = () => {
	const user = dummyData.user;
	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="내 정보" />
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
									<td className="tbody">{user.nickname}</td>
								</tr>
								<tr>
									<th className="thead">휴대폰 번호</th>
									<td className="tbody">{addDashes(user.phone)}</td>
								</tr>
								<tr>
									<th className="thead">주소</th>
									<td className="tbody">{`${user.address.split(',')[0]}, ${
										user.detail_address
									}`}</td>
								</tr>
								<tr>
									<th className="thead">은행명</th>
									<td className="tbody">
										{user.bank.length > 0 ? (
											user.bank
										) : (
											<Link to="/mypage/change/info">미등록</Link>
										)}
									</td>
								</tr>
								<tr>
									<th className="thead">계좌번호</th>
									<td className="tbody">
										{user.account.length > 0 ? (
											user.account
										) : (
											<Link to="/mypage/change/info">미등록</Link>
										)}
									</td>
								</tr>
								<tr>
									<th className="thead">예금주</th>
									<td className="tbody">
										{user.holder.length > 0 ? (
											user.holder
										) : (
											<Link to="/mypage/change/info">미등록</Link>
										)}
									</td>
								</tr>
								<tr>
									<th className="thead">사용 가능 포인트</th>
									<td className="tbody">
										{addCommasToNumber(user.current_point)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default MyProfile;
