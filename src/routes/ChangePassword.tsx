import Layout, { MyPageLayout } from 'components/Layout';
import Sidebar from 'components/SideBar';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PasswordChangeForm } from 'types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
		<Layout>
			<section className="flex space-x-6">
				<Sidebar currentMenu="비밀번호 변경" />
				<MyPageLayout>
					<h1 className="pb-3 mb-3 border-b-1">비밀번호 변경</h1>
					<form
						className="vertical space-y-6 max-w-md p-3"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="grow vertical space-y-3">
							<fieldset className="vertical space-y-1">
								<div className="flex items-end justify-between">
									<label htmlFor="oldPassword" className="font-medium">
										기존 비밀번호
									</label>
								</div>
								<input
									id="oldPassword"
									type="password"
									className="auth-input grow"
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
							<fieldset className="vertical space-y-1">
								<div className="flex items-end justify-between">
									<label htmlFor="newPassword" className="font-medium">
										신규 비밀번호
									</label>
									<span
										className={classNames('guide-msg', {
											error: errors.newPassword,
										})}
									>
										{errors.newPassword &&
											'대소문자/특수문자 관계없이 8-12자로 입력해주세요.'}
									</span>
								</div>
								<input
									id="newPassword"
									type="password"
									className="auth-input grow"
									required
									minLength={8}
									maxLength={12}
									placeholder="새로운 비밀번호를 입력해주세요."
									{...register('newPassword', {
										minLength: 8,
										maxLength: 12,
									})}
								/>
							</fieldset>
							<fieldset className="vertical space-y-1">
								<div className="flex items-end justify-between">
									<label htmlFor="newPasswordConfirm" className="font-medium">
										비밀번호 확인
									</label>
									<span
										className={classNames('guide-msg', {
											error: errors.newPasswordConfirm,
										})}
									>
										{errors.newPasswordConfirm &&
											(errors.newPasswordConfirm.type === 'validate'
												? '비밀번호가 다릅니다. 다시 한 번 확인해주세요.'
												: '대소문자/특수문자 관계없이 8-12자로 입력해주세요.')}
									</span>
								</div>
								<input
									id="newPasswordConfirm"
									type="password"
									className="auth-input grow"
									placeholder="새로운 비밀번호를 한 번 더 입력해주세요."
									{...register('newPasswordConfirm', {
										minLength: 8,
										maxLength: 12,
										validate: (value: string) => value === watch('newPassword'),
									})}
								/>
							</fieldset>
						</div>
						<button type="submit" className="btn-primary w-max">
							비밀번호 변경
						</button>
					</form>
				</MyPageLayout>
			</section>
		</Layout>
	);
};

export default ChangePassword;
