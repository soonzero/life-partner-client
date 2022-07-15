import Layout from 'components/Layout';
import useInputs from 'hooks/useInputs';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const initialState = {
	nickname: '',
	password: '',
};

const Login = () => {
	const [{ nickname, password }, onChange] = useInputs(initialState);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(nickname, password);
		// 로그인 api 연동
	};

	return (
		<Layout>
			<section className="max-w-sm">
				<h1 className="mb-6">로그인</h1>
				<form
					onSubmit={onSubmit}
					className="vertical rounded-lg border-1 border-gray-200 p-8"
				>
					<fieldset className="vertical mb-6">
						<div className="vertical mb-2">
							<label htmlFor="nickname" className="auth-label">
								닉네임
							</label>
							<input
								id="nickname"
								type="text"
								maxLength={8}
								minLength={3}
								placeholder="닉네임을 입력해주세요."
								className="auth-input"
								required
								value={nickname}
								onChange={onChange}
							/>
						</div>
						<label htmlFor="password" className="auth-label">
							비밀번호
						</label>
						<input
							id="password"
							type="password"
							maxLength={12}
							minLength={8}
							placeholder="비밀번호를 입력해주세요."
							className="auth-input"
							required
							value={password}
							onChange={onChange}
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
