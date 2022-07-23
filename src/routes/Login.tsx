import axios from 'axios';
import Layout from 'components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginForm } from 'types/types';
import classNames from 'classnames';

const Login = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		console.log(data);
		try {
			const result = await axios({
				method: 'POST',
				url: 'http://15.164.225.61/api/users/login',
				data,
			});
			if (result.data.result) {
				window.sessionStorage.setItem('token', result.data.token);
				navigate('/');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Layout>
			<section className="max-w-sm">
				<h1 className="mb-6">로그인</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="vertical rounded-lg border-1 border-gray-200 p-8"
				>
					<fieldset className="vertical mb-6">
						<div className="vertical mb-2">
							<div className="flex items-center justify-between">
								<label htmlFor="nickname" className="auth-label">
									닉네임
								</label>
								<span
									className={classNames('guide-msg', {
										error: errors.nickname,
									})}
								>
									{errors.nickname &&
										(errors.nickname.type === 'pattern'
											? '닉네임은 한글과 숫자만 포함할 수 있습니다.'
											: '닉네임을 3-8자로 입력해주세요.')}
								</span>
							</div>
							<input
								id="nickname"
								type="text"
								maxLength={8}
								minLength={3}
								placeholder="한글/숫자를 이용하여 3-8자로 입력해주세요."
								className="auth-input"
								{...register('nickname', {
									required: true,
									minLength: 3,
									maxLength: 8,
									pattern: /^[가-힣0-9]*$/,
								})}
							/>
						</div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="auth-label">
								비밀번호
							</label>
							<span
								className={classNames('guide-msg', {
									error: errors.password,
								})}
							>
								{errors.password &&
									errors.password.type === 'pattern' &&
									'비밀번호는 한글을 포함할 수 없습니다.'}
							</span>
						</div>
						<input
							id="password"
							type="password"
							maxLength={12}
							minLength={8}
							placeholder="비밀번호를 입력해주세요."
							className="auth-input"
							{...register('password', {
								required: true,
								minLength: 8,
								maxLength: 12,
								pattern: /^[^ㄱ-ㅎ가-힣]*$/,
							})}
						/>
					</fieldset>
					<button type="submit" className="btn-primary">
						로그인
					</button>
					<div className="flex mt-3 center">
						{/* 아이디 / 비밀번호 찾기 api 추후에 연동하기 */}
						{/* <Link to="/" className="text-slate-400 text-xs mr-3">
							아이디 찾기
						</Link>
						<Link to="/" className="text-slate-400 text-xs mr-12">
							비밀번호 찾기
						</Link> */}
						<span className="text-slate-500 text-xs">
							아직 아이디가 없으신가요?{' '}
							<Link to="/signup" className="font-semibold">
								회원가입
							</Link>
						</span>
					</div>
				</form>
			</section>
		</Layout>
	);
};

export default Login;
