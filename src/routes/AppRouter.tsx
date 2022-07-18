import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import NewSignup from './NewSignup';
import MyProfile from './MyProfile';
import WriteNewPost from './WriteNewPost';
import Point from './Point';

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
				<Route path="/mypage/point" element={<Point />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
