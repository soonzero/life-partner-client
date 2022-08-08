import NaverMap from './NaverMap';
import { MapInPost } from 'types/types';
import { addCommasToNumber } from 'functions/common';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MapLoadingSVG } from 'static/icons/map-loading.svg';
import classNames from 'classnames';

const Card = ({ item, detail, preview }: MapInPost) => {
	const navigate = useNavigate();
	return (
		<article
			className={classNames(
				'group vertical w-full h-72 rounded-xl border-1 hover:opacity-90 transition overflow-hidden bg-white dark:bg-dark dark:text-white',
				{
					'cursor-pointer': !preview,
				}
			)}
			onClick={() => !preview && navigate(`/articles/${item.id}`)}
		>
			<map className="map">
				<NaverMap id={item.id} location={item.location} detail={detail} />
			</map>
			<figcaption className="vertical grow m-3 overflow-hidden">
				<h4 className="text-lg font-bold truncate shrink-0 group-hover:animate-marquee group-hover:w-max ">
					{item.title}
				</h4>
				<p className="relative text-sm grow overflow-hidden after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-white dark:after:to-dark">
					<span className="inline-block break-normal">
						<span>{item.location.split(',')[0]}</span>
					</span>
				</p>
				<p className="flex justify-between">
					<span>{item.period}분 소요</span>
					<span className="font-medium">{addCommasToNumber(item.price)}원</span>
				</p>
			</figcaption>
		</article>
	);
};

export const LoadingCard = () => {
	return (
		<article className="vertical w-full h-72 rounded-xl border-1 overflow-hidden bg-white dark:bg-dark dark:text-white animate-pulse">
			<div className="map flex justify-center items-center text-gray-200 dark:text-gray-600 bg-gray-300 dark:bg-gray-700">
				<MapLoadingSVG />
			</div>
			<div className="grow vertical p-3">
				<div className="skeleton-text w-2/3 h-5 mb-3"></div>
				<div className="grow mb-2">
					<div className="skeleton-text w-3/4 h-3"></div>
				</div>
				<div className="horizontal space-between">
					<div className="skeleton-text w-20 h-4"></div>
					<div className="skeleton-text w-16 h-4"></div>
				</div>
			</div>
		</article>
	);
};

export default Card;
