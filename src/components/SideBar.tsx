import classNames from 'classnames';
import menuList from 'data/menuList';
import { Link } from 'react-router-dom';
import { CurrentMenu } from 'types/types';

const Sidebar = ({ currentMenu }: CurrentMenu) => {
	return (
		<aside className="w-48 shrink-0 border-2 border-main h-max rounded-xl sticky top-[89px] overflow-hidden">
			<nav>
				<h3 className="px-6 py-3 text-white bg-main">마이페이지</h3>
				<ul className="p-6 space-y-2">
					{menuList.sideBarMenu.map(([title, to], id) => (
						<li
							key={id}
							className={classNames('text-sm', {
								'text-slate-500': currentMenu !== title,
							})}
						>
							<Link to={to}>{title}</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
