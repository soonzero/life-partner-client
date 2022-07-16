import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import NewSignup from './NewSignup';
import MyPage from './MyPage';
import NewArticle from './NewArticle';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup-outdated" element={<Signup />} />
				<Route path="/signup" element={<NewSignup />} />
				<Route path="/login" element={<Login />} />;
				<Route path="/mypage" element={<MyPage />} />;
				<Route path="/articles/write" element={<NewArticle />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
