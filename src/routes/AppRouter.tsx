import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import NewSignup from './NewSignup';
import MyProfile from './MyProfile';
import WriteNewPost from './WriteNewPost';
import Point from './Point';
import Logout from './Logout';
import PostDetail from './PostDetail';
import ChangeInfo from './ChangeInfo';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup-outdated" element={<Signup />} />
				<Route path="/signup" element={<NewSignup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/mypage/profile" element={<MyProfile />} />
				<Route path="/posts/write" element={<WriteNewPost />} />
				<Route path="/mypage/point" element={<Point />} />
				<Route path="/articles/:id" element={<PostDetail />} />
				<Route path="/mypage/change/info" element={<ChangeInfo />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
