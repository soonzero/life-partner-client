import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import NewSignup from './NewSignup';
import MyProfile from './MyProfile';
import WriteNewPost from './WriteNewPost';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup-outdated" element={<Signup />} />
				<Route path="/signup" element={<NewSignup />} />
				<Route path="/login" element={<Login />} />;
				<Route path="/mypage/profile" element={<MyProfile />} />;
				<Route path="/posts/write" element={<WriteNewPost />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
