import axios from 'axios';
import classNames from 'classnames';
import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
	const navigate = useNavigate();
	const [word, setWord] = useState<string>('');

	const deleteAccount = async () => {
		if (word === '회원 탈퇴') {
			if (
				window.confirm(
					`회원 탈퇴는 되돌릴 수 없습니다. 그래도 탈퇴하시겠습니까?`
				)
			) {
				try {
					const result = await axios({
						method: 'DELETE',
						url: 'http://15.164.225.61/api/users/withdraw',
						headers: {
							authorization: `Bearer ${sessionStorage.getItem('token')}`,
						},
					});
					if (result.status === 200) {
						sessionStorage.removeItem('token');
						alert('회원 탈퇴되었습니다. 메인 페이지로 이동합니다.');
						navigate('/');
					}
				} catch (e) {
					console.log(e);
				}
			}
		} else {
			alert('문구를 정확하게 입력해주세요.');
		}
	};

	return (
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="회원 탈퇴" />
				<MyPageLayout>
					<article className="space-y-6">
						<h1>회원 탈퇴</h1>
						<div className="vertical center space-y-3">
							<p>고객님의 소중한 개인 정보는 회원 탈퇴 이후 즉시 폐기됩니다.</p>
							<p>
								따라서 회원 탈퇴 이후,{' '}
								<strong className="text-red-400">
									고객님의 정보는 복구될 수 없음
								</strong>
								을 안내드립니다.
							</p>
							<p>
								회원 탈퇴를 원하시면 빈 칸에{' '}
								<strong className="text-main">
									<label htmlFor="delete-account">
										'회원 탈퇴' 문구를 직접 입력
									</label>
								</strong>
								하시고,
							</p>
							<p>
								<strong className="text-main">회원 탈퇴 버튼</strong>을
								눌러주세요.
							</p>
						</div>
						<div className="space-y-3 vertical center">
							<input
								id="delete-account"
								type="text"
								size={6}
								maxLength={5}
								value={word}
								placeholder="회원 탈퇴"
								className="text-center border-1 px-3 py-1 outline-none font-extrabold text-2xl"
								onChange={(e) => setWord((prev) => e.target.value)}
							/>
							<button
								type="button"
								className={classNames('transition', {
									'btn-secondary': word !== '회원 탈퇴',
									'btn-primary': word === '회원 탈퇴',
								})}
								onClick={deleteAccount}
							>
								회원 탈퇴
							</button>
						</div>
					</article>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default DeleteAccount;
