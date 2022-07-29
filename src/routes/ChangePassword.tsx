import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PasswordChangeForm } from 'types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCapsLock from 'hooks/useCapsLock';

const ChangePassword = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<PasswordChangeForm>({
		mode: 'onChange',
	});
	const { capsLockIsActive, onKey } = useCapsLock();

	const onSubmit: SubmitHandler<PasswordChangeForm> = async (data) => {
		try {
			const response = await axios({
				method: 'PATCH',
				url: 'http://15.164.225.61/api/users/user-info/password',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
				data: {
					password: data.oldPassword,
					modifiedPassword: data.newPassword,
				},
			});
			if (response.data.result) {
				sessionStorage.removeItem('token');
				alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요!');
				navigate('/login');
			}
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Layout pageTitle="비밀번호 변경">
			<section className="mypage-layout">
				<Sidebar currentMenu="비밀번호 변경" />
				<MyPageLayout>
					<h1 className="md:pb-3">비밀번호 변경</h1>
					<form className="mypage-form" onSubmit={handleSubmit(onSubmit)}>
						<div className="grow vertical space-y-3">
							<fieldset className="space-y-1">
								<div className="flex items-end justify-between">
									<label htmlFor="oldPassword" className="mypage-label">
										기존 비밀번호
									</label>
								</div>
								<input
									id="oldPassword"
									type="password"
									className="auth-input"
									placeholder="기존에 사용하던 비밀번호를 입력해주세요."
									required
									minLength={8}
									maxLength={12}
									{...register('oldPassword', {
										required: true,
										minLength: 8,
										maxLength: 12,
									})}
								/>
							</fieldset>
							<fieldset className="space-y-1">
								<div className="vertical md:horizontal md:items-end md:justify-between">
									<label htmlFor="newPassword" className="mypage-label">
										신규 비밀번호
									</label>
									<span
										className={classNames('guide-msg', {
											error: errors.newPassword || capsLockIsActive,
										})}
									>
										{errors.newPassword &&
											(errors.newPassword.type === 'pattern'
												? '한글을 포함할 수 없습니다.'
												: '한글을 제외하고 8-12자로 입력해주세요.')}
										{capsLockIsActive && 'Caps Lock이 켜져 있어요.'}
									</span>
								</div>
								<input
									id="newPassword"
									type="password"
									className="auth-input"
									required
									minLength={8}
									maxLength={12}
									placeholder="새로운 비밀번호를 입력해주세요."
									{...register('newPassword', {
										minLength: 8,
										maxLength: 12,
										pattern: /^[^ㄱ-ㅎ가-힣]*$/,
									})}
									onKeyDown={onKey}
									onKeyUp={onKey}
								/>
							</fieldset>
							<fieldset className="space-y-1">
								<div className="vertical md:horizontal md:items-end md:justify-between">
									<label htmlFor="newPasswordConfirm" className="mypage-label">
										비밀번호 확인
									</label>
									<span
										className={classNames('guide-msg', {
											error: errors.newPasswordConfirm || capsLockIsActive,
										})}
									>
										{errors.newPasswordConfirm &&
											(errors.newPasswordConfirm.type === 'validate'
												? '비밀번호가 다릅니다.'
												: '한글을 제외하고 8-12자로 입력해주세요.')}
										{capsLockIsActive && 'Caps Lock이 켜져 있어요.'}
									</span>
								</div>
								<input
									id="newPasswordConfirm"
									type="password"
									className="auth-input"
									placeholder="새로운 비밀번호를 한 번 더 입력해주세요."
									{...register('newPasswordConfirm', {
										minLength: 8,
										maxLength: 12,
										validate: (value: string) => value === watch('newPassword'),
									})}
									onKeyDown={onKey}
									onKeyUp={onKey}
								/>
							</fieldset>
						</div>
						<button
							type="submit"
							className="btn-primary w-full md:w-max text-xs md:text-base"
						>
							비밀번호 변경
						</button>
					</form>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default ChangePassword;
