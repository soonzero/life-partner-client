import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'static/icons/logo.svg';

const NavBar = () => {
	return (
		<nav className="max-w-screen-2xl mx-auto h-16 flex items-center">
			<ul>
				<li>
					<Link to="/">
						<Logo className="w-12 h-12 text-main inline-block" />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
