import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'static/icons/logo.svg';

const NavBar = (props: { shadow: boolean; noShadow: boolean | undefined }) => {
	return (
		<nav className="max-w-screen-2xl mx-auto h-16 flex items-center">
			<ul>
				<li>
					<Link to="/">
						<Logo
							className={classNames('w-10 h-10 inline-block md:w-12 md:h-12', {
								'text-white': props.shadow && !props.noShadow,
								'text-main': !props.shadow || props.noShadow,
							})}
						/>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
