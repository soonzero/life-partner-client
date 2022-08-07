import Sidebar from 'components/SideBar';
import { ReactComponent as Profile } from 'static/icons/user.svg';
import { addCommasToNumber } from 'functions/common';
import Layout, { MyPageLayout } from 'components/Layout';
import { addDashes } from 'functions/dashes';
import { Link } from 'react-router-dom';
import useInfoQuery from 'hooks/useInfoQuery';

const MyProfile = () => {
	const { data } = useInfoQuery();

	return (
		<Layout noShadow pageTitle="내 정보">
			<section className="mypage-layout">
				<Sidebar currentMenu="내 정보" />
				{data && (
					<MyPageLayout>
						<h1>내 정보</h1>
						<div className="vertical center space-y-6 sm:space-y-0 sm:flex sm:flex-row sm:justify-start sm:items-center">
							<figure className="flex center bg-slate-200 w-20 h-20 sm:w-32 sm:h-32 rounded-full">
								<Profile className="w-8 h-8 sm:w-16 sm:h-16 fill-white" />
							</figure>
							<table className="xs:grow text-xs lg:text-base sm:w-max md:grow border-separate border-spacing-x-3 border-spacing-y-1">
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
										<td className="tbody whitespace-pre-line md:whitespace-normal">
											{`${data.address.split(',')[0]}, 
											${data.detail_address}`}
										</td>
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
										<th className="thead">가용 포인트</th>
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
