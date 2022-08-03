import axios, { AxiosError } from 'axios';
import Layout from 'components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginForm } from 'types/types';
import classNames from 'classnames';
import useCapsLock from 'hooks/useCapsLock';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: 'onChange',
	});
	const { capsLockIsActive, onKey } = useCapsLock();

	const login = async (form: LoginForm) => {
		const { data } = await axios({
			method: 'POST',
			url: 'http://15.164.225.61/api/users/login',
			data: form,
		});
		if (data.result) {
			window.sessionStorage.setItem('token', data.token);
			navigate('/');
		}
		return data;
	};

	const onSubmit: SubmitHandler<LoginForm> = async (form: LoginForm) => {
		mutateAsync(form);
	};

	const { mutateAsync } = useMutation(login, {
		onError: (error) => {
			if (error instanceof Error) {
				if (error.message === 'Network Error')
					alert('존재하지 않는 아이디입니다.');
				else if (error.message === 'Request failed with status code 400')
					alert('비밀번호가 틀립니다.');
			}
		},
	});

	return (
		<Layout pageTitle="로그인">
			<section className="max-w-md">
				<h1 className="text-2xl md:text-3xl">로그인</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="auth-form">
					<fieldset className="mb-6">
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
											? '한글과 숫자만 포함할 수 있습니다.'
											: '3-8자로 입력해주세요.')}
								</span>
							</div>
							<input
								id="nickname"
								type="text"
								maxLength={8}
								minLength={3}
								placeholder="닉네임을 입력해주세요."
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
									error: errors.password || capsLockIsActive,
								})}
							>
								{errors.password &&
									errors.password.type === 'pattern' &&
									'한글을 포함할 수 없습니다.'}
								{capsLockIsActive && 'Caps Lock이 켜져 있습니다.'}
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
							onKeyDown={onKey}
							onKeyUp={onKey}
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
