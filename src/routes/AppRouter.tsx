import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />;
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
