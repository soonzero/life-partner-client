import classNames from 'classnames';
import menuList from 'data/menuList';
import { Link } from 'react-router-dom';
import { CurrentMenu } from 'types/types';

const Sidebar = ({ currentMenu }: CurrentMenu) => {
	return (
		<aside className="bg-white border-b-1 w-full md:w-48 shrink-0 h-max md:rounded-xl md:border-2 md:border-main sticky top-[64px] md:top-[89px] overflow-hidden">
			<h3 className="pt-3 md:text-white md:bg-main md:px-6 md:py-3">
				마이페이지
			</h3>
			<nav className="overflow-scroll">
				<ul className="w-max py-3 md:p-6 flex md:block md:space-x-0 md:space-y-2">
					{menuList.sideBarMenu.map(([title, to], id) => (
						<li
							key={id}
							className={classNames(
								'text-sm py-1 px-2 font-medium text-main md:p-0',
								{
									'text-slate-500 font-normal': currentMenu !== title,
									'border-b-2 border-main md:border-b-0': currentMenu === title,
								}
							)}
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
