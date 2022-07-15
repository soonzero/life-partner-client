import Layout from 'components/Layout';
import useInputs from 'hooks/useInputs';
import { FormEvent } from 'react';

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
				</form>
			</section>
		</Layout>
	);
};

export default Login;
